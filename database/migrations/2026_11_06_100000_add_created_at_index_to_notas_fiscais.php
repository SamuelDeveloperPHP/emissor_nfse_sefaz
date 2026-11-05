<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // Dashboard counts notas without emitida_em (pending/rejected) by created_at.
    public function up(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->index(['emitente_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::table('notas_fiscais', function (Blueprint $table) {
            $table->dropIndex(['emitente_id', 'created_at']);
        });
    }
};
