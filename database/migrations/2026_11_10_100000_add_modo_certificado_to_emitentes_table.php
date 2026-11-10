<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('emitentes', function (Blueprint $table) {
            // 'certificado': the emitente's own A1. 'procuracao': the office's certificate acts for the emitente.
            $table->string('modo_certificado', 20)->default('certificado')->after('driver_config');
        });
    }

    public function down(): void
    {
        Schema::table('emitentes', function (Blueprint $table) {
            $table->dropColumn('modo_certificado');
        });
    }
};
