<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('emitentes', function (Blueprint $table) {
            $table->id();
            $table->string('razao_social', 200);
            $table->string('nome_fantasia', 200)->nullable();
            $table->string('cnpj', 14)->unique();
            $table->string('inscricao_municipal', 30)->nullable();
            $table->string('codigo_municipio', 7)->nullable();
            $table->string('municipio', 150)->nullable();
            $table->string('uf', 2)->nullable();
            $table->string('cep', 8)->nullable();
            $table->string('logradouro', 200)->nullable();
            $table->string('numero', 20)->nullable();
            $table->string('complemento', 100)->nullable();
            $table->string('bairro', 100)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('telefone', 20)->nullable();
            $table->string('regime_tributario', 30)->nullable();
            $table->string('ambiente', 20)->default('homologacao');
            $table->string('driver', 30)->default('adn_nacional');
            $table->json('driver_config')->nullable();
            $table->string('certificado_path')->nullable();
            $table->text('certificado_password')->nullable();
            $table->date('certificado_validade')->nullable();
            $table->string('rps_serie', 10)->nullable();
            $table->unsignedInteger('rps_numero_atual')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emitentes');
    }
};
