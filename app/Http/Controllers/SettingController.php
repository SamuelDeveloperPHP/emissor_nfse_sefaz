<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Configuracoes/index', [
            'escolher_ambiente' => Setting::bool(Setting::ESCOLHER_AMBIENTE),
        ]);
    }

    public function update(Request $request)
    {
        $dados = $request->validate([
            'escolher_ambiente' => ['required', 'boolean'],
        ]);

        Setting::putBool(Setting::ESCOLHER_AMBIENTE, (bool) $dados['escolher_ambiente']);

        return back()->with('success', 'Configurações salvas.');
    }
}
