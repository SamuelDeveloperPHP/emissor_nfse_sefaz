<?php

namespace Tests\Feature;

use App\Jobs\ProcessarLoteJob;
use App\Models\Emitente;
use App\Models\Lote;
use App\Models\NotaFiscal;
use App\Services\Nfse\CertificadoA1;
use App\Services\Nfse\DpsBuilder;
use App\Services\Nfse\Drivers\AdnNacionalDriver;
use App\Services\Nfse\LoteImporter;
use App\Services\Nfse\NfseException;
use App\Services\Nfse\XmlSigner;
use App\Services\Nfse\XsdValidator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Tests\Concerns\GeraCertificadoDeTeste;
use Tests\TestCase;

class AdnTransmissaoTest extends TestCase
{
    use GeraCertificadoDeTeste;
    use RefreshDatabase;

    private const SENHA = 'segredo-de-teste';

    private string $pfx;

    private int $contador = 0;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
        $this->pfx = $this->gerarPfx(self::SENHA);
    }

    private function emitente(string $driver = 'adn_nacional', bool $comCertificado = true): Emitente
    {
        $caminho = null;
        if ($comCertificado) {
            $caminho = 'certificados/teste.pfx';
            Storage::disk('local')->put($caminho, $this->pfx);
        }

        return Emitente::create([
            'razao_social' => 'Empresa Teste',
            'cnpj' => sprintf('112223%08d', ++$this->contador),
            'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345',
            'regime_tributario' => 'simples_nacional',
            'ambiente' => 'homologacao',
            'driver' => $driver,
            'is_active' => true,
            'certificado_path' => $caminho,
            'certificado_password' => $comCertificado ? self::SENHA : null,
        ]);
    }

    private function linha(): array
    {
        return [
            'tomador_documento' => '12345678909',
            'tomador_nome' => 'Fulano de Tal',
            'tomador_email' => 'fulano@exemplo.com.br',
            'descricao_servico' => 'Consultoria contábil',
            'codigo_tributacao_nacional' => '171901',
            'valor_servico' => '1.500,00',
            'aliquota_iss' => '2,00',
            'iss_retido' => '0',
            'data_competencia' => '2026-11-05',
        ];
    }

    private function processar(Emitente $emitente, string $ambiente = 'homologacao'): NotaFiscal
    {
        $lote = app(LoteImporter::class)->importarLinha($emitente, null, $this->linha(), ambiente: $ambiente);
        ProcessarLoteJob::dispatchSync($lote);

        return $lote->notas()->first()->refresh();
    }

    private function nfseXml(string $chave = '35503082112223300018100001000000000042123456789012', string $numero = '42'): string
    {
        return '<?xml version="1.0"?><NFSe xmlns="http://www.sped.fazenda.gov.br/nfse"><infNFSe Id="NFS'.$chave.'"><nNFSe>'.$numero.'</nNFSe></infNFSe></NFSe>';
    }

    private function sucesso(): array
    {
        $chave = sprintf('3550308211222330001810000100%022d', ++$this->contador);

        return ['chaveAcesso' => $chave, 'nfseXmlGZipB64' => base64_encode(gzencode($this->nfseXml($chave)))];
    }

    // ---- signing -------------------------------------------------------------------------

    public function test_signed_dps_verifies_passes_the_official_xsd_and_detects_tampering(): void
    {
        $emitente = $this->emitente();
        $certificado = CertificadoA1::doEmitente($emitente);
        $xml = (new DpsBuilder)->build($emitente, [
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao' => 'Serviço', 'codigo_tributacao' => '171901',
            'valor' => 100, 'aliquota' => 2.0, 'iss_retido' => false, 'competencia' => '2026-11-05',
        ], 1);

        foreach (['sha1', 'sha256'] as $algoritmo) {
            $assinado = (new XmlSigner)->assinarDps($xml, $certificado, $algoritmo);

            $this->assertTrue((new XmlSigner)->verificar($assinado), $algoritmo);
            $this->assertSame([], (new XsdValidator)->validarDps($assinado), $algoritmo);
            $this->assertMatchesRegularExpression('#<Signature xmlns="http://www.w3.org/2000/09/xmldsig\#">#', $assinado);
            $this->assertStringContainsString('URI="#DPS3550308', $assinado);

            // Changing anything that was signed breaks it.
            $this->assertFalse((new XmlSigner)->verificar(str_replace('<vServ>100.00</vServ>', '<vServ>999.00</vServ>', $assinado)), $algoritmo);
        }

        $this->assertFalse((new XmlSigner)->verificar($xml), 'an unsigned DPS must not verify');
    }

    public function test_signer_refuses_to_sign_twice_and_unknown_algorithms(): void
    {
        $emitente = $this->emitente();
        $certificado = CertificadoA1::doEmitente($emitente);
        $xml = (new DpsBuilder)->build($emitente, [
            'tomador_documento' => '12345678909', 'tomador_nome' => 'Fulano', 'descricao' => 'Serviço', 'codigo_tributacao' => '171901',
            'valor' => 100, 'aliquota' => 2.0, 'competencia' => '2026-11-05',
        ], 1);
        $assinado = (new XmlSigner)->assinarDps($xml, $certificado, 'sha256');

        $this->expectException(NfseException::class);
        (new XmlSigner)->assinarDps($assinado, $certificado, 'sha256');
    }

    public function test_unknown_signature_algorithm_is_refused(): void
    {
        $this->expectException(NfseException::class);
        (new XmlSigner)->assinarDps('<DPS/>', CertificadoA1::doEmitente($this->emitente()), 'md5');
    }

    public function test_certificate_with_wrong_password_or_expired_is_explained(): void
    {
        try {
            CertificadoA1::dePfx($this->pfx, 'senha-errada');
            $this->fail('wrong password accepted');
        } catch (NfseException $e) {
            $this->assertStringContainsString('senha', $e->getMessage());
        }

        try {
            $vencido = $this->gerarPfx('x', 0);
            sleep(1); // validity of 0 days ends the moment it is issued
            CertificadoA1::dePfx($vencido, 'x');
            $this->fail('expired certificate accepted');
        } catch (NfseException $e) {
            $this->assertStringContainsString('venceu', $e->getMessage());
        }
    }

    // ---- driver --------------------------------------------------------------------------

    public function test_authorized_reply_stores_the_access_key_and_the_nfse_xml(): void
    {
        Http::fake(fn () => Http::response($this->sucesso(), 201));

        $nota = $this->processar($this->emitente());

        $this->assertSame(NotaFiscal::STATUS_AUTORIZADA, $nota->status);
        $this->assertMatchesRegularExpression('/^\d{50}$/', $nota->chave_acesso);
        $this->assertStringContainsString($nota->chave_acesso, $nota->nfse_xml);
        $this->assertSame('42', $nota->numero_nfse);
        $this->assertStringContainsString('<nNFSe>42</nNFSe>', $nota->nfse_xml);
        $this->assertNotNull($nota->emitida_em);
        $this->assertTrue((new XmlSigner)->verificar($nota->dps_xml), 'the stored DPS is the signed one');
        $this->assertSame(Lote::STATUS_CONCLUIDO, $nota->lote->status);
    }

    public function test_the_request_carries_the_gzipped_signed_dps_to_the_environment_of_the_lote(): void
    {
        Http::fake(fn () => Http::response($this->sucesso(), 201));
        $emitente = $this->emitente(); // cadastrado como homologacao

        $this->processar($emitente, 'homologacao');
        $this->processar($emitente, 'producao');

        $enviadas = Http::recorded()->map(fn (array $par) => $par[0]);
        $this->assertCount(2, $enviadas);

        $this->assertSame('https://sefin.producaorestrita.nfse.gov.br/API/SefinNacional/nfse', $enviadas[0]->url());
        $this->assertSame('https://sefin.nfse.gov.br/SefinNacional/nfse', $enviadas[1]->url());

        /** @var Request $primeira */
        $primeira = $enviadas[0];
        $this->assertSame('POST', $primeira->method());
        $xmlEnviado = gzdecode(base64_decode($primeira['dpsXmlGZipB64'], true));
        $this->assertTrue((new XmlSigner)->verificar($xmlEnviado));
        $this->assertStringContainsString('<tpAmb>2</tpAmb>', $xmlEnviado);
        $this->assertStringContainsString('<tpAmb>1</tpAmb>', gzdecode(base64_decode($enviadas[1]['dpsXmlGZipB64'], true)));
    }

    public function test_a_refusal_rejects_the_nota_with_the_adn_messages(): void
    {
        Http::fake(['*' => Http::response(['erros' => [['codigo' => 'E0312', 'descricao' => 'Tomador inválido', 'complemento' => 'CPF']]], 400)]);

        $nota = $this->processar($this->emitente());

        $this->assertSame(NotaFiscal::STATUS_REJEITADA, $nota->status);
        $this->assertSame('E0312: Tomador inválido (CPF)', $nota->motivo_rejeicao);
        $this->assertNull($nota->chave_acesso);
        $this->assertSame(Lote::STATUS_CONCLUIDO_COM_ERROS, $nota->lote->status);
    }

    public function test_server_errors_and_timeouts_leave_the_nota_pending_never_rejected(): void
    {
        Http::fake(['*' => Http::response('Bad gateway', 502)]);
        $nota = $this->processar($this->emitente());
        $this->assertSame(NotaFiscal::STATUS_PENDENTE, $nota->status);
        $this->assertStringContainsString('502', $nota->erros[0]);
        $this->assertNotNull($nota->dps_xml, 'what was sent is kept so it can be looked up');
        $this->assertSame(Lote::STATUS_AGUARDANDO_TRANSMISSAO, $nota->lote->status);

        Http::fake(fn () => throw new ConnectionException('cURL error 28: timed out'));
        $nota = $this->processar($this->emitente());
        $this->assertSame(NotaFiscal::STATUS_PENDENTE, $nota->status);
        $this->assertStringContainsString('consulte', $nota->erros[0]);
    }

    public function test_certificate_refused_by_the_adn_is_not_the_notas_fault(): void
    {
        Http::fake(['*' => Http::response('', 403)]);

        $this->assertSame(NotaFiscal::STATUS_PENDENTE, $this->processar($this->emitente())->status);
    }

    // ---- job -----------------------------------------------------------------------------

    public function test_missing_certificate_rejects_the_whole_lote_before_spending_any_dps_number(): void
    {
        Http::fake();
        $emitente = $this->emitente('adn_nacional', false);

        $nota = $this->processar($emitente);

        $this->assertSame(NotaFiscal::STATUS_REJEITADA, $nota->status);
        $this->assertStringContainsString('certificado', $nota->motivo_rejeicao);
        $this->assertSame(0, (int) $emitente->fresh()->rps_numero_atual);
        Http::assertNothingSent();
    }

    public function test_drivers_that_do_not_transmit_still_leave_the_nota_pending_and_unsigned(): void
    {
        Http::fake();

        $nota = $this->processar($this->emitente('prefeitura_legada', false));

        $this->assertSame(NotaFiscal::STATUS_PENDENTE, $nota->status);
        $this->assertStringNotContainsString('Signature', $nota->dps_xml);
        Http::assertNothingSent();
    }

    public function test_url_helper_defaults_to_homologacao(): void
    {
        $driver = new AdnNacionalDriver;

        $this->assertStringContainsString('producaorestrita', $driver->url('qualquer', '/nfse'));
        $this->assertStringNotContainsString('producaorestrita', $driver->url('producao', '/nfse'));
    }
}
