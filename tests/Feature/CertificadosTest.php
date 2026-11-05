<?php

namespace Tests\Feature;

use App\Models\Emitente;
use App\Models\User;
use App\Services\Nfse\CertificadoA1;
use App\Services\Nfse\CofreDeCertificados;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Tests\Concerns\GeraCertificadoDeTeste;
use Tests\TestCase;

/** Administração > Configurações > Certificados digitais: upload, checks, protection and removal. */
class CertificadosTest extends TestCase
{
    use GeraCertificadoDeTeste;
    use RefreshDatabase;

    private const SENHA = 'senha-secreta-123';

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
        $this->seed(RolesAndPermissionsSeeder::class);
        $this->actingAs(User::where('email', 'admin@example.com')->first());
    }

    private function emitente(string $cnpj = '11222333000181'): Emitente
    {
        return Emitente::create([
            'razao_social' => 'Empresa Teste', 'cnpj' => $cnpj, 'codigo_municipio' => '3550308',
            'inscricao_municipal' => '12345', 'regime_tributario' => 'simples_nacional',
            'ambiente' => 'homologacao', 'driver' => 'adn_nacional', 'is_active' => true,
        ]);
    }

    /** Raw (still encrypted) value of the password column, to prove it is not stored in clear text. */
    private function senhaNoBanco(Emitente $emitente): string
    {
        return (string) DB::table('emitentes')->where('id', $emitente->id)->value('certificado_password');
    }

    private function arquivo(string $pfx): UploadedFile
    {
        return UploadedFile::fake()->createWithContent('cert.pfx', $pfx);
    }

    public function test_a_valid_certificate_is_checked_stored_encrypted_and_described(): void
    {
        $emitente = $this->emitente();
        $pfx = $this->gerarPfx(self::SENHA);

        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($pfx), 'certificado_senha' => self::SENHA])
            ->assertSessionHas('success');

        $emitente->refresh();
        $this->assertSame('11222333000181', $emitente->certificado_cnpj);
        $this->assertSame('EMPRESA TESTE LTDA:11222333000181', $emitente->certificado_titular);
        $this->assertNotNull($emitente->certificado_validade);
        $this->assertSame(self::SENHA, $emitente->certificado_password);
        $this->assertNotNull($emitente->certificado_enviado_por);

        // At rest: neither the .pfx nor the password appear in clear text.
        $guardado = Storage::disk('local')->get($emitente->certificado_path);
        $this->assertStringEndsWith('.pfx.enc', $emitente->certificado_path);
        $this->assertStringNotContainsString($pfx, $guardado);
        $this->assertStringNotContainsString(self::SENHA, $this->senhaNoBanco($emitente));

        // And it opens exactly as an emission would.
        $this->assertInstanceOf(CertificadoA1::class, CertificadoA1::doEmitente($emitente));
    }

    public function test_the_page_never_exposes_the_file_path_the_password_or_the_full_fingerprint(): void
    {
        $emitente = $this->emitente();
        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($this->gerarPfx(self::SENHA)), 'certificado_senha' => self::SENHA]);

        $resposta = $this->get(route('configuracoes.index'));
        $resposta->assertInertia(fn (AssertableInertia $page) => $page
            ->where('certificados.0.tem_certificado', true)
            ->where('certificados.0.cnpj_certificado', '11222333000181')
            ->missing('certificados.0.certificado_path')
            ->missing('certificados.0.certificado_password'));

        $conteudo = $resposta->getContent();
        $this->assertStringNotContainsString(self::SENHA, $conteudo);
        $this->assertStringNotContainsString(".pfx.enc", $conteudo);

        // The emitentes list does not leak them either.
        $lista = $this->get(route('emitentes.index'))->getContent();
        $this->assertStringNotContainsString('.pfx.enc', $lista);
        $this->assertStringNotContainsString(self::SENHA, $lista);
    }

    public function test_wrong_password_expired_or_corrupted_files_are_refused_and_nothing_is_kept(): void
    {
        $emitente = $this->emitente();
        $pfx = $this->gerarPfx(self::SENHA);

        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($pfx), 'certificado_senha' => 'errada'])
            ->assertSessionHas('error');
        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo('isto não é um pfx'), 'certificado_senha' => self::SENHA])
            ->assertSessionHas('error');
        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($this->gerarPfx(self::SENHA, 0)), 'certificado_senha' => self::SENHA])
            ->assertSessionHas('error', fn ($m) => str_contains($m, 'venceu'));

        $this->assertNull($emitente->fresh()->certificado_path);
        $this->assertSame([], Storage::disk('local')->allFiles('certificados'));
    }

    public function test_a_certificate_of_another_company_is_refused_but_a_branch_of_the_same_company_is_fine(): void
    {
        $outra = $this->emitente('99888777000100');

        $this->post(route('certificados.store', $outra), ['certificado' => $this->arquivo($this->gerarPfx(self::SENHA)), 'certificado_senha' => self::SENHA])
            ->assertSessionHas('error', fn ($m) => str_contains($m, 'outra empresa'));
        $this->assertNull($outra->fresh()->certificado_path);

        // Same 8-digit root (matriz and filial): accepted.
        $filial = $this->emitente('11222333000262');
        $this->post(route('certificados.store', $filial), ['certificado' => $this->arquivo($this->gerarPfx(self::SENHA)), 'certificado_senha' => self::SENHA])
            ->assertSessionHas('success');
    }

    public function test_a_certificate_whose_cnpj_cannot_be_read_is_kept_with_a_warning(): void
    {
        $emitente = $this->emitente();
        $pfx = $this->gerarPfx(self::SENHA, 365, 'Titular sem cnpj no nome');

        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($pfx), 'certificado_senha' => self::SENHA])
            ->assertSessionHas('warning')
            ->assertSessionMissing('success');
        $this->assertNotNull($emitente->fresh()->certificado_path);
    }

    public function test_replacing_removes_the_old_file_and_removing_clears_everything(): void
    {
        $emitente = $this->emitente();
        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($this->gerarPfx(self::SENHA)), 'certificado_senha' => self::SENHA]);
        $primeiro = $emitente->fresh()->certificado_path;

        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($this->gerarPfx('outra-senha')), 'certificado_senha' => 'outra-senha']);
        $segundo = $emitente->fresh()->certificado_path;

        $this->assertNotSame($primeiro, $segundo);
        Storage::disk('local')->assertMissing($primeiro);
        Storage::disk('local')->assertExists($segundo);

        $this->delete(route('certificados.destroy', $emitente))->assertSessionHas('success');
        $emitente->refresh();
        $this->assertNull($emitente->certificado_path);
        $this->assertNull($emitente->certificado_password);
        $this->assertNull($emitente->certificado_titular);
        $this->assertSame([], Storage::disk('local')->allFiles('certificados'));
    }

    public function test_the_test_button_opens_the_certificate_and_explains_failures(): void
    {
        $emitente = $this->emitente();

        $this->post(route('certificados.testar', $emitente))->assertSessionHas('error', fn ($m) => str_contains($m, 'não tem certificado'));

        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($this->gerarPfx(self::SENHA)), 'certificado_senha' => self::SENHA]);
        $this->post(route('certificados.testar', $emitente))->assertSessionHas('success');

        // A changed APP_KEY makes the vault unreadable: say so instead of failing with a 500.
        Storage::disk('local')->put($emitente->fresh()->certificado_path, 'lixo-criptografado');
        $this->post(route('certificados.testar', $emitente))->assertSessionHas('error', fn ($m) => str_contains($m, 'Envie o certificado de novo'));
    }

    public function test_only_the_administrador_reaches_these_actions(): void
    {
        $emitente = $this->emitente();
        $operador = User::factory()->create(['all_emitentes' => true]);
        $operador->syncRoles(['Operador']);
        $operador->givePermissionTo('emitentes.view', 'emitentes.edit');
        $this->actingAs($operador);

        $this->get(route('configuracoes.index'))->assertForbidden();
        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($this->gerarPfx(self::SENHA)), 'certificado_senha' => self::SENHA])->assertForbidden();
        $this->post(route('certificados.testar', $emitente))->assertForbidden();
        $this->delete(route('certificados.destroy', $emitente))->assertForbidden();
    }

    public function test_validation_asks_for_the_file_and_the_password(): void
    {
        $emitente = $this->emitente();

        $this->post(route('certificados.store', $emitente), [])->assertSessionHasErrors(['certificado', 'certificado_senha']);
        $this->post(route('certificados.store', $emitente), ['certificado' => UploadedFile::fake()->create('cert.txt', 1), 'certificado_senha' => 'x'])->assertSessionHasErrors('certificado');
    }

    public function test_logs_name_who_and_which_certificate_but_never_the_password(): void
    {
        Log::spy();
        $emitente = $this->emitente();

        $this->post(route('certificados.store', $emitente), ['certificado' => $this->arquivo($this->gerarPfx(self::SENHA)), 'certificado_senha' => self::SENHA]);

        Log::shouldHaveReceived('info')->once()->withArgs(function ($mensagem, $contexto) {
            return $mensagem === 'Certificado digital enviado.'
                && isset($contexto['emitente_id'], $contexto['user_id'], $contexto['impressao'])
                && ! str_contains(json_encode($contexto), self::SENHA);
        });
    }

    public function test_the_protect_command_encrypts_plain_files_from_older_versions(): void
    {
        $emitente = $this->emitente();
        $pfx = $this->gerarPfx(self::SENHA);
        Storage::disk('local')->put('certificados/antigo.pfx', $pfx);
        $emitente->update(['certificado_path' => 'certificados/antigo.pfx', 'certificado_password' => self::SENHA]);

        // The old plain file still works...
        $this->assertInstanceOf(CertificadoA1::class, CertificadoA1::doEmitente($emitente->fresh()));

        $this->artisan('nfse:proteger-certificados')->assertSuccessful();

        $emitente->refresh();
        $this->assertTrue(app(CofreDeCertificados::class)->estaProtegido($emitente->certificado_path));
        Storage::disk('local')->assertMissing('certificados/antigo.pfx');
        $this->assertInstanceOf(CertificadoA1::class, CertificadoA1::doEmitente($emitente));
    }
}
