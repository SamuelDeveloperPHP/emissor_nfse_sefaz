<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $table = "orders";

    protected $fillable = [
        "order_id",
        "customer_name",
        "product",
        "order_date",
        "amount",
        "payment_method",
        "delivery_status"
    ];
}
