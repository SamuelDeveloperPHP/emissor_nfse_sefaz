<?php

namespace Database\Seeders;

use App\Models\Orders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 15; $i++) {
            $fakeData = [
                "order_id" => $faker->unique()->randomNumber(5),
                "customer_name" => $faker->name,
                "product" => $faker->word,
                "amount" => $faker->randomFloat(2, 10, 1000),
                "payment_method" => $faker->randomElement(['Mastercard', 'Paypal', 'Visa', 'COD']),
                "delivery_status" => $faker->randomElement(['Pending', 'Inprogress', 'Cancelled', 'Pickups', 'Returns', 'Delivered'])
            ];
            Orders::create($fakeData);
        }
    }
}
