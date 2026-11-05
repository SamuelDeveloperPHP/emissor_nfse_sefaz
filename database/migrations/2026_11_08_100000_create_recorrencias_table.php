<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Monthly invoices issued by the scheduler: same tomador, service and value, on a fixed day.
        Schema::create('recorrencias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emitente_id')->constrained('emitentes')->cascadeOnDelete();
            // A tomador or service in use by a recurrence cannot be deleted from under it.
            $table->foreignId('tomador_id')->constrained('tomadores')->restrictOnDelete();
            $table->foreignId('servico_id')->constrained('servicos')->restrictOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->decimal('valor', 15, 2);
            $table->unsignedTinyInteger('dia_do_mes'); // 1..28 so every month has the day
            $table->string('ambiente', 20)->default('homologacao');
            $table->boolean('ativa')->default(true);
            $table->date('proxima_emissao');
            $table->timestamp('ultima_emissao_em')->nullable();
            $table->foreignId('ultimo_lote_id')->nullable()->constrained('lotes')->nullOnDelete();
            $table->string('ultimo_erro', 255)->nullable();
            $table->timestamps();

            $table->index(['ativa', 'proxima_emissao']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recorrencias');
    }
};
