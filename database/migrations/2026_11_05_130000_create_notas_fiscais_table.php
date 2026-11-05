<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notas_fiscais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emitente_id')->constrained('emitentes')->cascadeOnDelete();
            $table->string('numero')->nullable();
            $table->string('status')->default('pendente');
            $table->decimal('valor_servicos', 15, 2)->default(0);
            $table->text('motivo_rejeicao')->nullable();
            $table->timestamp('emitida_em')->nullable();
            $table->timestamps();

            $table->index(['emitente_id', 'emitida_em']);
            $table->index(['status', 'emitida_em']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notas_fiscais');
    }
};
