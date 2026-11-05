<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Environment the lote was issued in (homologacao | producao), kept for the record.
        Schema::table('lotes', function (Blueprint $table) {
            $table->string('ambiente', 20)->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('lotes', function (Blueprint $table) {
            $table->dropColumn('ambiente');
        });

        Schema::dropIfExists('settings');
    }
};
