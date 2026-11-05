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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string("order_id", 250)->nullable();
            $table->string("customer_name", 250)->nullable();
            $table->string("product", 250)->nullable();
            $table->date("order_date")->nullable();
            $table->integer("amount")->nullable();
            $table->string("payment_method", 50)->nullable();
            $table->string("delivery_status", 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
