<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\Lote;
use App\Models\NotaFiscal;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use OpenSpout\Reader\XLSX\Reader;
use Tests\TestCase;
use ZipArchive;

class FechamentoTest extends TestCase
{
    use RefreshDatabase;

    private int $contador = 0;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionsSeeder::class);
        $this->travelTo(now()->setDate(2026, 11, 20)->setTime(12, 0));
    }

    private function admin(): User
    {
        return User::where('email', 'admin@example.com')->first();
    }

    private function emitente(string $driver = 'adn_nacional'): Emitente
    {
        return Emitente::create([
            'razao_social' => 'Empresa '.++$this->contador,
            'cnpj' => sprintf('112223%08d', $this->contador),
            'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345',
            'regime_tributario' => 'lucro_presumido',
            'ambiente' => 'producao',
            'driver' => $driver,
            'is_active' => true,
        ]);
    }

    private function nota(Emitente $emitente, array $extra = [], string $ambiente = 'producao'): NotaFiscal
    {
        $lote = Lote::create(['emitente_id' => $emitente->id, 'arquivo' => 'x', 'status' => 'concluido', 'total' => 1, 'ambiente' => $ambiente]);
        $n = ++$this->contador;

        return NotaFiscal::create(array_merge([
            'emitente_id' => $emitente->id,
            'lote_id' => $lote->id,
            'status' => 'autorizada',
            'valor_servicos' => 1000,
            'chave_acesso' => sprintf('%050d', $n),
            'numero_nfse' => (string) $n,
            'nfse_xml' => '<NFSe>'.$n.'</NFSe>',
            'emitida_em' => '2026-11-05 10:00:00',
            'payload' => ['tomador_nome' => 'Maria', 'tomador_documento' => '12345678909', 'descricao' => 'Serviço', 'aliquota' => 5, 'iss_retido' => false],
        ], $extra));
    }

    /** @return array<string, array<int, array<int, mixed>>> sheet name => rows */
    private function lerPlanilha(string $conteudo): array
    {
        $caminho = tempnam(sys_get_temp_dir(), 'xl').'.xlsx';
        file_put_contents($caminho, $conteudo);

        $reader = new Reader;
        $reader->open($caminho);
        $abas = [];
        foreach ($reader->getSheetIterator() as $aba) {
            foreach ($aba->getRowIterator() as $linha) {
                $abas[$aba->getName()][] = $linha->toArray();
            }
        }
        $reader->close();
        unlink($caminho);

        return $abas;
    }

    public function test_the_summary_covers_the_month_the_emitente_and_the_environment_without_the_simulator(): void
    {
        $a = $this->emitente();
        $b = $this->emitente();
        $simulada = $this->emitente('simulador');

        $this->nota($a);                                                              // counts
        $this->nota($a, ['payload' => ['tomador_nome' => 'Pedro', 'aliquota' => 5, 'iss_retido' => true]]); // 50 retained
        $this->nota($a, ['status' => 'cancelada']);                                   // listed, not summed
        $this->nota($a, ['emitida_em' => '2026-10-31 23:00:00']);                     // other month
        $this->nota($a, [], 'homologacao');                                           // other environment
        $this->nota($a, ['status' => 'rejeitada', 'emitida_em' => null, 'nfse_xml' => null, 'chave_acesso' => null]); // never issued
        $this->nota($simulada);                                                       // never issued for real
        $this->nota($b, ['valor_servicos' => 500]);

        $this->actingAs($this->admin())->get(route('fechamento.index', ['mes' => '2026-11']))
            ->assertOk()
            ->assertInertia(fn ($p) => $p->component('Fiscal/Fechamento/index')
                ->where('resumo.autorizadas', 3)
                ->where('resumo.canceladas', 1)
                ->where('resumo.valor', 2500)
                ->where('resumo.iss_retido', 50)
                ->has('emitentes', 2)); // the simulator emitente is not offered

        $this->get(route('fechamento.index', ['mes' => '2026-11', 'emitente_id' => $b->id]))
            ->assertInertia(fn ($p) => $p->where('resumo.autorizadas', 1)->where('resumo.valor', 500));

        $this->get(route('fechamento.index', ['mes' => '2026-11', 'ambiente' => 'homologacao']))
            ->assertInertia(fn ($p) => $p->where('resumo.autorizadas', 1));

        $this->get(route('fechamento.index', ['mes' => 'novembro']))->assertSessionHasErrors('mes');
    }

    public function test_the_spreadsheet_has_the_three_sheets_with_correct_totals(): void
    {
        $a = $this->emitente();
        $b = $this->emitente();
        $this->nota($a, ['valor_servicos' => 1000, 'payload' => ['tomador_nome' => 'Maria', 'tomador_documento' => '12345678909', 'aliquota' => 5, 'iss_retido' => true]]);
        $this->nota($a, ['valor_servicos' => 200, 'payload' => ['tomador_nome' => 'Maria', 'tomador_documento' => '12345678909', 'aliquota' => 5, 'iss_retido' => false]]);
        $this->nota($b, ['valor_servicos' => 300, 'payload' => ['tomador_nome' => 'João', 'tomador_documento' => '98765432100', 'aliquota' => 2, 'iss_retido' => false]]);
        $this->nota($a, ['status' => 'cancelada', 'valor_servicos' => 9999]);

        $resposta = $this->actingAs($this->admin())->get(route('fechamento.excel', ['mes' => '2026-11']))->assertOk();
        $abas = $this->lerPlanilha($resposta->baseResponse->getFile()->getContent());

        $this->assertSame(['Notas', 'Por tomador', 'Por emitente'], array_keys($abas));

        $this->assertCount(5, $abas['Notas'], 'header plus 3 authorized and 1 cancelled');
        $situacoes = array_column(array_slice($abas['Notas'], 1), 12);
        $this->assertSame(1, count(array_filter($situacoes, fn ($s) => $s === 'Cancelada')));

        $maria = collect($abas['Por tomador'])->first(fn ($linha) => $linha[0] === 'Maria');
        $this->assertSame(2, $maria[3]);
        $this->assertEquals(1200, $maria[4]);
        $this->assertEquals(50, $maria[5], 'only the withheld nota counts as ISS retido');

        $this->assertCount(3, $abas['Por emitente'], 'header plus two emitentes');
        $this->assertEquals(1200, collect($abas['Por emitente'])->first(fn ($l) => $l[0] === $a->razao_social)[3], 'cancelled value excluded');
    }

    public function test_the_zip_has_the_xml_of_each_nota_by_emitente_and_the_cancellation_event(): void
    {
        $a = $this->emitente();
        $viva = $this->nota($a);
        $cancelada = $this->nota($a, ['status' => 'cancelada', 'cancelamento_xml' => '<pedRegEvento/>']);
        $this->nota($this->emitente('simulador'));

        $resposta = $this->actingAs($this->admin())->get(route('fechamento.zip', ['mes' => '2026-11']))->assertOk();

        $zip = new ZipArchive;
        $this->assertTrue($zip->open($resposta->baseResponse->getFile()->getPathname()));
        $nomes = [];
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $nomes[] = $zip->getNameIndex($i);
        }
        sort($nomes);

        $pasta = $a->cnpj;
        $this->assertSame([
            "{$pasta}/{$viva->chave_acesso}.xml",
            "{$pasta}/{$cancelada->chave_acesso}-cancelamento.xml",
            "{$pasta}/{$cancelada->chave_acesso}.xml",
        ], $nomes);
        $this->assertSame('<pedRegEvento/>', $zip->getFromName("{$pasta}/{$cancelada->chave_acesso}-cancelamento.xml"));
        $zip->close();
    }

    public function test_an_empty_period_explains_instead_of_downloading(): void
    {
        $this->emitente();

        $this->actingAs($this->admin())->get(route('fechamento.excel', ['mes' => '2026-11']))->assertSessionHas('error');
        $this->get(route('fechamento.zip', ['mes' => '2026-11']))->assertSessionHas('error');
    }

    public function test_users_only_get_their_emitentes_and_need_the_export_permission(): void
    {
        $meu = $this->emitente();
        $outro = $this->emitente();
        $this->nota($meu);
        $this->nota($outro);

        $operador = User::factory()->create(['all_emitentes' => false]);
        $operador->syncRoles(['Operador']);
        $operador->emitentes()->attach($meu->id);
        $operador->givePermissionTo('fechamento.view');

        $this->actingAs($operador)->get(route('fechamento.index', ['mes' => '2026-11']))
            ->assertInertia(fn ($p) => $p->where('resumo.autorizadas', 1)->has('emitentes', 1));

        $this->get(route('fechamento.excel', ['mes' => '2026-11']))->assertForbidden();
        $this->get(route('fechamento.zip', ['mes' => '2026-11']))->assertForbidden();

        $operador->givePermissionTo('fechamento.exportar');
        $this->get(route('fechamento.zip', ['mes' => '2026-11', 'emitente_id' => $outro->id]))->assertSessionHas('error'); // nothing of theirs there
    }
}
