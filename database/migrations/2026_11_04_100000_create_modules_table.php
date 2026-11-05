<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->string('name', 150);
            $table->string('icon', 50)->nullable();
            $table->string('route', 150)->nullable();
            $table->foreignId('parent_id')->nullable()->references('id')->on('modules')->nullOnDelete();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->json('actions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
