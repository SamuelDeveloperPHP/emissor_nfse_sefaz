<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            // Last time the nota was e-mailed to the tomador, and to which address.
            $table->timestamp('email_enviado_em')->nullable()->after('consultada_em');
            $table->string('email_enviado_para', 150)->nullable()->after('email_enviado_em');
        });
    }

    public function down(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->dropColumn(['email_enviado_em', 'email_enviado_para']);
        });
    }
};
