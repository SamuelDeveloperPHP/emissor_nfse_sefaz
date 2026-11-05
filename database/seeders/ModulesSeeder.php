<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;

class ModulesSeeder extends Seeder
{
    /**
     * Seed the core modules that make up the sidebar.
     *
     * "Administração" and "Fiscal" are pure groupings (no route of their own).
     * "Notas Fiscais" and "Monitoramento" are registered but inactive — their screens
     * belong to a later step of the batch-emission phase.
     */
    public function run(): void
    {
        Module::updateOrCreate(['key' => 'dashboard'], [
            'name' => 'Painel',
            'icon' => 'bx bx-bar-chart-alt-2',
            'route' => 'dashboard',
            'order' => 1,
        ]);

        $administracao = Module::updateOrCreate(['key' => 'administracao'], [
            'name' => 'Administração',
            'icon' => 'bx bx-cog',
            'order' => 90,
        ]);

        Module::updateOrCreate(['key' => 'modulos'], [
            'name' => 'Módulos',
            'icon' => 'bx bx-collection',
            'route' => 'modules.index',
            'parent_id' => $administracao->id,
            'order' => 91,
        ]);

        Module::updateOrCreate(['key' => 'papeis-permissoes'], [
            'name' => 'Papéis & Permissões',
            'icon' => 'bx bx-lock-alt',
            'route' => 'roles.index',
            'parent_id' => $administracao->id,
            'order' => 92,
        ]);

        Module::updateOrCreate(['key' => 'usuarios'], [
            'name' => 'Usuários',
            'icon' => 'bx bx-user',
            'route' => 'users.index',
            'parent_id' => $administracao->id,
            'order' => 93,
        ]);

        Module::updateOrCreate(['key' => 'configuracoes'], [
            'name' => 'Configurações',
            'icon' => 'bx bx-slider-alt',
            'route' => 'configuracoes.index',
            'parent_id' => $administracao->id,
            'order' => 94,
        ]);

        $fiscal = Module::updateOrCreate(['key' => 'fiscal'], [
            'name' => 'Fiscal',
            'icon' => 'bx bx-receipt',
            'order' => 10,
        ]);

        Module::updateOrCreate(['key' => 'emitentes'], [
            'name' => 'Emitentes',
            'icon' => 'bx bx-briefcase-alt',
            'route' => 'emitentes.index',
            'parent_id' => $fiscal->id,
            'order' => 11,
        ]);

        Module::updateOrCreate(['key' => 'lotes-emissao'], [
            'name' => 'Lotes de Emissão',
            'icon' => 'bx bx-upload',
            'route' => 'lotes.index',
            'parent_id' => $fiscal->id,
            'order' => 13,
            'is_active' => true,
            'actions' => ['cancelar'],
        ]);

        Module::updateOrCreate(['key' => 'nfse-avulsa'], [
            'name' => 'NFS-e Avulsa',
            'icon' => 'bx bx-file-blank',
            'route' => 'lotes.emitir',
            'parent_id' => $fiscal->id,
            'order' => 12,
            'is_active' => true,
        ]);

        Module::updateOrCreate(['key' => 'notas-fiscais'], [
            'name' => 'Notas Fiscais',
            'icon' => 'bx bx-file',
            'route' => 'notas.index',
            'parent_id' => $fiscal->id,
            'order' => 14,
            'is_active' => true,
            'actions' => ['cancelar', 'enviar'],
        ]);

        Module::updateOrCreate(['key' => 'tomadores'], [
            'name' => 'Tomadores',
            'icon' => 'bx bx-group',
            'route' => 'tomadores.index',
            'parent_id' => $fiscal->id,
            'order' => 16,
        ]);

        Module::updateOrCreate(['key' => 'servicos'], [
            'name' => 'Serviços',
            'icon' => 'bx bx-list-check',
            'route' => 'servicos.index',
            'parent_id' => $fiscal->id,
            'order' => 17,
        ]);

        Module::updateOrCreate(['key' => 'recorrencias'], [
            'name' => 'Notas recorrentes',
            'icon' => 'bx bx-calendar-event',
            'route' => 'recorrencias.index',
            'parent_id' => $fiscal->id,
            'order' => 18,
        ]);

        Module::updateOrCreate(['key' => 'monitoramento'], [
            'name' => 'Monitoramento',
            'icon' => 'bx bx-pulse',
            'parent_id' => $fiscal->id,
            'order' => 15,
            'is_active' => false,
        ]);
    }
}
