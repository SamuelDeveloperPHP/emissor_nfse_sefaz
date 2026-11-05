<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emitente_id')->constrained('emitentes')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('arquivo');
            $table->string('status')->default('processando');
            $table->unsignedInteger('total')->default(0);
            $table->timestamp('processado_em')->nullable();
            $table->timestamps();

            $table->index(['emitente_id', 'created_at']);
        });

        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->foreignId('lote_id')->nullable()->after('emitente_id')->constrained('lotes')->cascadeOnDelete();
            $table->unsignedInteger('linha')->nullable()->after('lote_id');
            $table->json('payload')->nullable();
            $table->longText('dps_xml')->nullable();
            $table->json('erros')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->dropConstrainedForeignId('lote_id');
            $table->dropColumn(['linha', 'payload', 'dps_xml', 'erros']);
        });

        Schema::dropIfExists('lotes');
    }
};
