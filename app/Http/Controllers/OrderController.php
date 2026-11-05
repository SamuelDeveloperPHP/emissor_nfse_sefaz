<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index() {
        return Inertia::render('Ecommerce/EcommerceOrders/index', [
            'orders' => Orders::all(),
            'delivered' => Orders::where('delivery_status', 'Delivered')->get(),
            'pickups' => Orders::where('delivery_status', 'Pickups')->get(),
            'returns' => Orders::where('delivery_status', 'Returns')->get(),
            'cancelled' => Orders::where('delivery_status', 'Cancelled')->get(),
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            "order_id" => "required|string|max:250",
            "customer_name" => "required|string|max:250",
            "product" => "required|string|max:250",
            // "order_date" => "required|dat",
            "amount" => "required|integer|between:0,9999",
            "payment_method" => "required|string|max:50",
            "delivery_status" => "required|string|max:50",
        ]);

        try {
            Orders::create($request->all());
            return back()->with('success', 'Order Created Successfully');
        } catch (\Throwable $th) {
            return back()->with('error', 'Something went wrong');
        }
    }

    public function update(Request $request) {
        $request->validate([
            "id" => "required|integer",
            "order_id" => "required|string|max:250",
            "customer_name" => "required|string|max:250",
            "product" => "required|string|max:250",
            // "order_date" => "required|dat",
            "amount" => "required|integer|between:0,9999",
            "payment_method" => "required|string|max:50",
            "delivery_status" => "required|string|max:50",
        ]);

        try {
            $order = Orders::find($request->id);
            $order->update($request->all());

            return back()->with('success', 'Order Updated Successfully');
        } catch (\Throwable $th) {
            return back()->with('error', 'Something went wrong');
        }
    }

    public function destroy(Request $request) {
        $request->validate([
            "id" => "required|integer"
        ]);

        try {
            Orders::destroy($request->id);
            return back()->with('success', 'Order Deleted Successfully');
        } catch (\Throwable $th) {
            return back()->with('error', 'Something went wrong');
        }
    }
}
