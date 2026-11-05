<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Codes for the IBS/CBS group of the DPS. They come from the official tables (indicador de
        // operação, CST, classificação tributária), so nothing is defaulted: the accountant fills them.
        Schema::table('servicos', function (Blueprint $table) {
            $table->string('ibscbs_codigo_operacao', 6)->nullable()->after('iss_retido');
            $table->string('ibscbs_cst', 3)->nullable()->after('ibscbs_codigo_operacao');
            $table->string('ibscbs_classificacao', 6)->nullable()->after('ibscbs_cst');
        });
    }

    public function down(): void
    {
        Schema::table('servicos', function (Blueprint $table) {
            $table->dropColumn(['ibscbs_codigo_operacao', 'ibscbs_cst', 'ibscbs_classificacao']);
        });
    }
};
