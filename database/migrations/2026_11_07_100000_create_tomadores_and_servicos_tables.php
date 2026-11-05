<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Customers an emitente invoices, so CPF/CNPJ and address are typed once.
        Schema::create('tomadores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emitente_id')->constrained('emitentes')->cascadeOnDelete();
            $table->string('documento', 14);
            $table->string('nome', 300);
            $table->string('email', 80)->nullable();
            $table->string('cep', 8)->nullable();
            $table->string('logradouro', 255)->nullable();
            $table->string('numero', 60)->nullable();
            $table->string('complemento', 156)->nullable();
            $table->string('bairro', 60)->nullable();
            $table->string('codigo_municipio', 7)->nullable();
            $table->timestamps();

            $table->unique(['emitente_id', 'documento']);
        });

        // Services an emitente sells over and over: description, national tax code and ISS preset.
        Schema::create('servicos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emitente_id')->constrained('emitentes')->cascadeOnDelete();
            $table->string('nome', 120);
            $table->text('descricao');
            $table->string('codigo_tributacao', 6);
            $table->decimal('aliquota', 5, 2)->nullable();
            $table->boolean('iss_retido')->default(false);
            $table->timestamps();

            $table->index('emitente_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('servicos');
        Schema::dropIfExists('tomadores');
    }
};
