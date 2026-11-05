<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // What the system learned from the certificate when it was sent (never the key or the password).
        Schema::table('emitentes', function (Blueprint $table) {
            $table->string('certificado_titular', 255)->nullable()->after('certificado_validade');
            $table->string('certificado_cnpj', 14)->nullable()->after('certificado_titular');
            $table->string('certificado_impressao', 64)->nullable()->after('certificado_cnpj');
            $table->timestamp('certificado_enviado_em')->nullable()->after('certificado_impressao');
            $table->foreignId('certificado_enviado_por')->nullable()->after('certificado_enviado_em')->constrained('users')->nullOnDelete();
        });

        // A substituted nota stays "cancelada"; this points to the nota that replaced it.
        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->foreignId('substituida_por_id')->nullable()->after('cancelamento_xml')->constrained('notas_fiscais')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->dropConstrainedForeignId('substituida_por_id');
        });

        Schema::table('emitentes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('certificado_enviado_por');
            $table->dropColumn(['certificado_titular', 'certificado_cnpj', 'certificado_impressao', 'certificado_enviado_em']);
        });
    }
};
