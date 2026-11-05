<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->timestamp('cancelada_em')->nullable()->after('emitida_em');
            $table->string('cancelamento_motivo', 255)->nullable()->after('cancelada_em');
            // Signed cancellation event as it was sent, kept as the record of the request.
            $table->longText('cancelamento_xml')->nullable()->after('nfse_xml');
            $table->timestamp('consultada_em')->nullable()->after('cancelamento_motivo');
        });
    }

    public function down(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->dropColumn(['cancelada_em', 'cancelamento_motivo', 'cancelamento_xml', 'consultada_em']);
        });
    }
};
