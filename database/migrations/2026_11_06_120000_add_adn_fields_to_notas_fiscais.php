<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            // Access key of the authorized NFS-e (50 digits) and the NFS-e number the municipality/ADN assigned.
            $table->string('chave_acesso', 60)->nullable()->after('numero');
            $table->string('numero_nfse', 30)->nullable()->after('chave_acesso');
            // Authorized NFS-e XML as returned by the ADN, and the raw reply kept for support.
            $table->longText('nfse_xml')->nullable()->after('dps_xml');
            $table->json('resposta')->nullable()->after('erros');

            $table->unique('chave_acesso');
        });
    }

    public function down(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->dropUnique(['chave_acesso']);
            $table->dropColumn(['chave_acesso', 'numero_nfse', 'nfse_xml', 'resposta']);
        });
    }
};
