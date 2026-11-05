<?php

namespace Tests\Feature;

use App\Mail\NotaFiscalEmitida;
use App\Models\Emitente;
use App\Models\NotaFiscal;
use App\Models\User;
use App\Services\Nfse\EventoBuilder;
use App\Services\Nfse\CertificadoA1;
use App\Services\Nfse\XmlSigner;
use App\Services\Nfse\XsdValidator;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Tests\Concerns\GeraCertificadoDeTeste;
use Tests\TestCase;

class NotasFiscaisTest extends TestCase
{
    use GeraCertificadoDeTeste;
    use RefreshDatabase;

    private const SENHA = 'segredo-de-teste';

    private const CHAVE = '35503082112223300018100001000000000042123456789012';

    private int $contador = 0;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
        $this->seed(RolesAndPermissionsSeeder::class);
    }

    private function admin(): User
    {
        return User::where('email', 'admin@example.com')->first();
    }

    private function emitente(string $driver = 'adn_nacional'): Emitente
    {
        Storage::disk('local')->put('certificados/teste.pfx', $this->gerarPfx(self::SENHA));

        return Emitente::create([
            'razao_social' => 'Empresa '.++$this->contador,
            'cnpj' => sprintf('112223%08d', $this->contador),
            'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345',
            'regime_tributario' => 'simples_nacional',
            'ambiente' => 'homologacao',
            'driver' => $driver,
            'is_active' => true,
            'certificado_path' => 'certificados/teste.pfx',
            'certificado_password' => self::SENHA,
        ]);
    }

    private function nota(Emitente $emitente, string $status = 'autorizada', array $extra = []): NotaFiscal
    {
        return NotaFiscal::create(array_merge([
            'emitente_id' => $emitente->id,
            'status' => $status,
            'valor_servicos' => 1500,
            'numero' => '7',
            'chave_acesso' => $status === 'autorizada' ? self::CHAVE : null,
            'numero_nfse' => $status === 'autorizada' ? '42' : null,
            'payload' => ['tomador_nome' => 'Fulano de Tal', 'tomador_documento' => '12345678909', 'descricao' => 'Consultoria'],
            'dps_xml' => '<DPS xmlns="http://www.sped.fazenda.gov.br/nfse"><infDPS Id="DPS355030821122233000181000010000000000007"/></DPS>',
            'nfse_xml' => $status === 'autorizada' ? '<NFSe/>' : null,
            'emitida_em' => $status === 'autorizada' ? now() : null,
        ], $extra));
    }

    private function operador(Emitente ...$emitentes): User
    {
        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->emitentes()->attach(array_map(fn ($e) => $e->id, $emitentes));

        return $operador;
    }

    // ---- list and detail ------------------------------------------------------------------

    public function test_the_list_shows_only_notas_of_emitentes_the_user_can_access_and_filters(): void
    {
        $meu = $this->emitente();
        $outro = $this->emitente();
        $this->nota($meu, 'autorizada', ['chave_acesso' => str_repeat('1', 50)]);
        $this->nota($meu, 'rejeitada');
        $this->nota($outro, 'autorizada', ['chave_acesso' => str_repeat('2', 50)]);

        $operador = $this->operador($meu);
        $operador->givePermissionTo('notas-fiscais.view');

        $this->actingAs($operador)->get(route('notas.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Fiscal/Notas/index')->where('notas.total', 2));

        $this->get(route('notas.index', ['status' => 'rejeitada']))
            ->assertInertia(fn ($page) => $page->where('notas.total', 1));

        $this->get(route('notas.index', ['q' => 'Fulano']))
            ->assertInertia(fn ($page) => $page->where('notas.total', 2));

        $this->get(route('notas.index', ['q' => 'nao-existe']))
            ->assertInertia(fn ($page) => $page->where('notas.total', 0));
    }

    public function test_a_user_without_the_permission_or_the_emitente_is_refused(): void
    {
        $meu = $this->emitente();
        $outro = $this->emitente();
        $nota = $this->nota($outro);

        $operador = $this->operador($meu);
        $this->actingAs($operador)->get(route('notas.index'))->assertForbidden();

        $operador->givePermissionTo('notas-fiscais.view');
        $this->get(route('notas.show', $nota))->assertForbidden();
        $this->get(route('notas.xml', [$nota, 'nfse']))->assertForbidden();
        $this->post(route('notas.consultar', $nota))->assertForbidden();
    }

    public function test_the_detail_page_renders_and_xml_downloads_work(): void
    {
        $nota = $this->nota($this->emitente());

        $this->actingAs($this->admin())->get(route('notas.show', $nota))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Fiscal/Notas/show')
                ->where('nota.numero_nfse', '42')
                ->where('nota.pode_cancelar', true)
                ->where('nota.tem_nfse', true));

        $this->get(route('notas.xml', [$nota, 'nfse']))->assertOk()->assertHeader('content-type', 'application/xml');
        $this->get(route('notas.xml', [$nota, 'dps']))->assertOk();
        $this->get(route('notas.xml', [$nota, 'cancelamento']))->assertNotFound();
        $this->get(route('notas.xml', [$nota, 'qualquer']))->assertNotFound();
    }

    // ---- lookup of pending notas --------------------------------------------------------------

    public function test_consulting_a_pending_nota_authorizes_it_when_the_adn_knows_it(): void
    {
        $nota = $this->nota($this->emitente(), 'pendente');
        $xml = '<NFSe xmlns="http://www.sped.fazenda.gov.br/nfse"><infNFSe Id="NFS'.self::CHAVE.'"><nNFSe>42</nNFSe></infNFSe></NFSe>';

        Http::fake([
            '*/dps/*' => Http::response(['chaveAcesso' => self::CHAVE], 200),
            '*/nfse/*' => Http::response(['chaveAcesso' => self::CHAVE, 'nfseXmlGZipB64' => base64_encode(gzencode($xml))], 200),
        ]);

        $this->actingAs($this->admin())->post(route('notas.consultar', $nota))->assertSessionHas('success');

        $nota->refresh();
        $this->assertSame(NotaFiscal::STATUS_AUTORIZADA, $nota->status);
        $this->assertSame(self::CHAVE, $nota->chave_acesso);
        $this->assertSame('42', $nota->numero_nfse);
        $this->assertNotNull($nota->emitida_em);
        $this->assertNotNull($nota->consultada_em);
        Http::assertSent(fn ($request) => str_ends_with($request->url(), '/dps/DPS355030821122233000181000010000000000007'));
    }

    public function test_a_dps_the_adn_does_not_know_yet_stays_pending(): void
    {
        $nota = $this->nota($this->emitente(), 'pendente');
        Http::fake(['*' => Http::response('', 404)]);

        $this->actingAs($this->admin())->post(route('notas.consultar', $nota))->assertSessionHas('error');

        $nota->refresh();
        $this->assertSame(NotaFiscal::STATUS_PENDENTE, $nota->status);
        $this->assertStringContainsString('ainda não encontrou', $nota->erros[0]);
    }

    public function test_the_scheduled_command_resolves_old_pending_notas_and_skips_the_rest(): void
    {
        $emitente = $this->emitente();
        $velha = $this->nota($emitente, 'pendente');
        $velha->forceFill(['updated_at' => now()->subMinutes(10)])->saveQuietly();
        $recente = $this->nota($emitente, 'pendente'); // just sent: still within the wait
        $semDps = $this->nota($emitente, 'pendente', ['dps_xml' => null]);
        $legada = $this->nota($this->emitente('prefeitura_legada'), 'pendente');
        $legada->forceFill(['updated_at' => now()->subMinutes(10)])->saveQuietly();

        Http::fake([
            '*/dps/*' => Http::response(['chaveAcesso' => self::CHAVE], 200),
            '*/nfse/*' => Http::response(['chaveAcesso' => self::CHAVE], 200), // no XML: still authorized by the key
        ]);

        $this->artisan('nfse:consultar-pendentes')->assertSuccessful();

        $this->assertSame(NotaFiscal::STATUS_AUTORIZADA, $velha->fresh()->status);
        $this->assertSame(NotaFiscal::STATUS_PENDENTE, $recente->fresh()->status);
        $this->assertSame(NotaFiscal::STATUS_PENDENTE, $semDps->fresh()->status);
        $this->assertSame(NotaFiscal::STATUS_PENDENTE, $legada->fresh()->status);
    }

    // ---- cancellation ---------------------------------------------------------------------------

    public function test_the_cancellation_event_is_valid_signed_and_accepted(): void
    {
        $nota = $this->nota($this->emitente());
        Http::fake(['*' => Http::response([], 200)]);

        $this->actingAs($this->admin())->post(route('notas.cancelar', $nota), [
            'motivo_codigo' => '1',
            'motivo' => 'Valor digitado errado na emissão',
        ])->assertSessionHas('success');

        $nota->refresh();
        $this->assertSame(NotaFiscal::STATUS_CANCELADA, $nota->status);
        $this->assertNotNull($nota->cancelada_em);
        $this->assertSame('Valor digitado errado na emissão', $nota->cancelamento_motivo);

        $this->assertTrue((new XmlSigner)->verificar($nota->cancelamento_xml, 'infPedReg'));
        $this->assertSame([], (new XsdValidator)->validarEvento($nota->cancelamento_xml));
        $this->assertStringContainsString('Id="PRE'.self::CHAVE.'101101"', $nota->cancelamento_xml);

        Http::assertSent(function ($request) {
            return str_ends_with($request->url(), '/nfse/'.self::CHAVE.'/eventos')
                && str_contains(gzdecode(base64_decode($request['pedidoRegistroEventoXmlGZipB64'], true)), '<e101101>');
        });
    }

    public function test_a_refused_cancellation_keeps_the_nota_authorized_and_says_why(): void
    {
        $nota = $this->nota($this->emitente());
        Http::fake(['*' => Http::response(['erros' => [['codigo' => 'E0420', 'descricao' => 'Prazo de cancelamento excedido']]], 400)]);

        $this->actingAs($this->admin())->post(route('notas.cancelar', $nota), [
            'motivo_codigo' => '2',
            'motivo' => 'Serviço não foi prestado ao tomador',
        ])->assertSessionHasErrors(['cancelamento' => 'E0420: Prazo de cancelamento excedido']);

        $this->assertSame(NotaFiscal::STATUS_AUTORIZADA, $nota->fresh()->status);
    }

    public function test_cancellation_rules_are_enforced(): void
    {
        $emitente = $this->emitente();
        $pendente = $this->nota($emitente, 'pendente');
        $autorizada = $this->nota($emitente);
        Http::fake();

        $this->actingAs($this->admin())
            ->post(route('notas.cancelar', $autorizada), ['motivo_codigo' => '1', 'motivo' => 'curto'])
            ->assertSessionHasErrors('motivo');

        $this->post(route('notas.cancelar', $autorizada), ['motivo_codigo' => '5', 'motivo' => 'Motivo com mais de quinze letras'])
            ->assertSessionHasErrors('motivo_codigo');

        $this->post(route('notas.cancelar', $pendente), ['motivo_codigo' => '1', 'motivo' => 'Motivo com mais de quinze letras'])
            ->assertSessionHasErrors('cancelamento');

        Http::assertNothingSent();

        $operador = $this->operador($emitente);
        $operador->givePermissionTo('notas-fiscais.view');
        $this->actingAs($operador)
            ->post(route('notas.cancelar', $autorizada), ['motivo_codigo' => '1', 'motivo' => 'Motivo com mais de quinze letras'])
            ->assertForbidden();
    }

    public function test_the_simulator_cancels_without_a_certificate_or_an_event(): void
    {
        $emitente = $this->emitente('simulador');
        $emitente->update(['certificado_path' => null, 'certificado_password' => null]);
        $nota = $this->nota($emitente, 'autorizada', ['chave_acesso' => null]);

        $this->actingAs($this->admin())->post(route('notas.cancelar', $nota), [
            'motivo_codigo' => '9',
            'motivo' => 'Teste de cancelamento no simulador',
        ])->assertSessionHas('success');

        $this->assertSame(NotaFiscal::STATUS_CANCELADA, $nota->fresh()->status);
        $this->assertNull($nota->fresh()->cancelamento_xml);
    }

    public function test_event_builder_rejects_bad_input(): void
    {
        $emitente = $this->emitente();

        $this->expectException(\App\Services\Nfse\NfseException::class);
        (new EventoBuilder)->cancelamento($emitente, '123', '1', 'Motivo com mais de quinze letras', 'homologacao');
    }

    // ---- e-mail ---------------------------------------------------------------------------------

    public function test_an_authorized_nota_is_queued_by_e_mail_with_the_xml_and_pdf(): void
    {
        Mail::fake();
        $nota = $this->nota($this->emitente(), 'autorizada', ['nfse_xml' => '<NFSe>conteudo</NFSe>']);

        $this->actingAs($this->admin())->post(route('notas.email', $nota), ['email' => 'cliente@exemplo.com.br'])
            ->assertSessionHasNoErrors()->assertSessionHas('success');

        Mail::assertQueued(NotaFiscalEmitida::class, fn (NotaFiscalEmitida $mail) => $mail->hasTo('cliente@exemplo.com.br'));

        $nota->refresh();
        $this->assertSame('cliente@exemplo.com.br', $nota->email_enviado_para);
        $this->assertNotNull($nota->email_enviado_em);
    }

    /** @return array<int, string> attachment file names of the message really built and "sent" */
    private function anexosEnviados(NotaFiscal $nota): array
    {
        config(['mail.default' => 'array']);
        Mail::mailer('array')->to('cliente@exemplo.com.br')->sendNow(new NotaFiscalEmitida($nota));

        $mensagem = Mail::mailer('array')->getSymfonyTransport()->messages()->last()->getOriginalMessage();

        return array_map(fn ($anexo) => $anexo->getFilename(), $mensagem->getAttachments());
    }

    public function test_the_message_carries_the_xml_and_the_pdf_when_the_adn_provides_it(): void
    {
        Http::fake(['*' => Http::response('%PDF-1.4 fake', 200)]);
        $nota = $this->nota($this->emitente(), 'autorizada', ['nfse_xml' => '<NFSe>conteudo</NFSe>']);

        $this->assertSame(['nfse-'.self::CHAVE.'.xml', 'danfse-'.self::CHAVE.'.pdf'], $this->anexosEnviados($nota));
    }

    public function test_the_message_still_goes_with_the_xml_when_the_pdf_is_unavailable(): void
    {
        Http::fake(['*' => Http::response('', 500)]);
        $nota = $this->nota($this->emitente(), 'autorizada', ['nfse_xml' => '<NFSe/>']);

        $this->assertSame(['nfse-'.self::CHAVE.'.xml'], $this->anexosEnviados($nota));
    }

    public function test_simulated_unauthorized_or_xmlless_notas_are_never_e_mailed(): void
    {
        Mail::fake();
        $this->actingAs($this->admin());

        $simulada = $this->nota($this->emitente('simulador'), 'autorizada', ['nfse_xml' => '<NFSe/>']);
        $pendente = $this->nota($this->emitente(), 'pendente');
        $semXml = $this->nota($this->emitente(), 'autorizada', ['nfse_xml' => null, 'chave_acesso' => str_repeat('3', 50)]);

        foreach ([$simulada, $pendente, $semXml] as $nota) {
            $this->post(route('notas.email', $nota), ['email' => 'cliente@exemplo.com.br'])->assertSessionHasErrors('email');
        }

        $this->post(route('notas.email', $semXml), ['email' => 'isso-nao-e-email'])->assertSessionHasErrors('email');
        Mail::assertNothingQueued();
    }

    public function test_sending_by_e_mail_needs_its_own_permission_and_emitente_access(): void
    {
        Mail::fake();
        $meu = $this->emitente();
        $outro = $this->emitente();
        $nota = $this->nota($meu, 'autorizada', ['nfse_xml' => '<NFSe/>']);
        $alheia = $this->nota($outro, 'autorizada', ['nfse_xml' => '<NFSe/>', 'chave_acesso' => str_repeat('4', 50)]);

        $operador = $this->operador($meu);
        $operador->givePermissionTo('notas-fiscais.view');

        $this->actingAs($operador)->post(route('notas.email', $nota), ['email' => 'a@b.com'])->assertForbidden();

        $operador->givePermissionTo('notas-fiscais.enviar');
        $this->post(route('notas.email', $alheia), ['email' => 'a@b.com'])->assertForbidden();
        $this->post(route('notas.email', $nota), ['email' => 'a@b.com'])->assertSessionHasNoErrors();

        Mail::assertQueuedCount(1);
    }

    public function test_the_e_mail_renders_without_markup_injection(): void
    {
        $nota = $this->nota($this->emitente(), 'autorizada', ['payload' => ['tomador_nome' => '<script>alert(1)</script>']]);

        $html = (new NotaFiscalEmitida($nota))->render();

        $this->assertStringNotContainsString('<script>', $html);
        $this->assertStringContainsString('&lt;script&gt;', $html);
    }

    // ---- DANFSE ---------------------------------------------------------------------------------

    public function test_danfse_streams_the_pdf_or_explains_when_unavailable(): void
    {
        $nota = $this->nota($this->emitente());

        // Stubs accumulate and the first match wins, so both answers go into one sequence.
        Http::fake(['*' => Http::sequence()->push('%PDF-1.4 fake', 200, ['Content-Type' => 'application/pdf'])->push('', 500)]);
        $this->actingAs($this->admin())->get(route('notas.danfse', $nota))
            ->assertOk()
            ->assertHeader('content-type', 'application/pdf');

        $this->get(route('notas.danfse', $nota))->assertSessionHas('error');
    }
}
