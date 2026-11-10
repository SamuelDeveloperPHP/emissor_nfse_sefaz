<?php

use App\Http\Controllers\CertificadoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmitenteController;
use App\Http\Controllers\FechamentoController;
use App\Http\Controllers\LoteController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\NotaFiscalController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecorrenciaController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ServicoController;
use App\Http\Controllers\TomadorController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VelzonRoutesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get("/apps-ecommerce-orders", [ProfileController::class, 'index'])->name('order-list');
Route::redirect('/', '/dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile-update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile-destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware('permission:dashboard.view')
        ->name('dashboard');

    Route::get('lotes', [LoteController::class, 'index'])->middleware('permission:lotes-emissao.view')->name('lotes.index');
    Route::get('lotes/modelo', [LoteController::class, 'modelo'])->middleware('permission:lotes-emissao.view')->name('lotes.modelo');
    Route::get('lotes/emitir', [LoteController::class, 'emitir'])->middleware('permission:nfse-avulsa.view')->name('lotes.emitir');
    Route::post('lotes/emitir', [LoteController::class, 'emitirStore'])->middleware('permission:nfse-avulsa.create')->name('lotes.emitir.store');
    Route::post('lotes/previa', [LoteController::class, 'previa'])->middleware('permission:lotes-emissao.create')->name('lotes.previa');
    Route::get('lotes/{lote}/rejeitadas', [LoteController::class, 'rejeitadas'])->middleware('permission:lotes-emissao.view')->name('lotes.rejeitadas');
    Route::post('lotes', [LoteController::class, 'store'])->middleware('permission:lotes-emissao.create')->name('lotes.store');
    Route::get('lotes/{lote}', [LoteController::class, 'show'])->middleware('permission:lotes-emissao.view')->name('lotes.show');

    Route::get('notas', [NotaFiscalController::class, 'index'])->middleware('permission:notas-fiscais.view')->name('notas.index');
    Route::get('notas/{nota}', [NotaFiscalController::class, 'show'])->middleware('permission:notas-fiscais.view')->name('notas.show');
    Route::get('notas/{nota}/xml/{tipo}', [NotaFiscalController::class, 'xml'])->middleware('permission:notas-fiscais.view')->name('notas.xml');
    Route::get('notas/{nota}/danfse', [NotaFiscalController::class, 'danfse'])->middleware('permission:notas-fiscais.view')->name('notas.danfse');
    Route::post('notas/{nota}/consultar', [NotaFiscalController::class, 'consultar'])->middleware('permission:notas-fiscais.view')->name('notas.consultar');
    Route::post('notas/{nota}/enviar-email', [NotaFiscalController::class, 'enviarEmail'])->middleware('permission:notas-fiscais.enviar')->name('notas.email');
    Route::post('notas/consultar-pendentes', [NotaFiscalController::class, 'consultarPendentes'])->middleware('permission:notas-fiscais.view')->name('notas.consultar-pendentes');
    Route::get('notas/{nota}/substituir', [NotaFiscalController::class, 'substituir'])->middleware('permission:notas-fiscais.substituir')->name('notas.substituir');
    Route::post('notas/{nota}/substituir', [NotaFiscalController::class, 'substituirStore'])->middleware('permission:notas-fiscais.substituir')->name('notas.substituir.store');
    Route::post('notas/{nota}/cancelar', [NotaFiscalController::class, 'cancelar'])->middleware('permission:notas-fiscais.cancelar')->name('notas.cancelar');

    Route::get('tomadores', [TomadorController::class, 'index'])->middleware('permission:tomadores.view')->name('tomadores.index');
    Route::post('tomadores', [TomadorController::class, 'store'])->middleware('permission:tomadores.create')->name('tomadores.store');
    Route::put('tomadores/{tomador}', [TomadorController::class, 'update'])->middleware('permission:tomadores.edit')->name('tomadores.update');
    Route::delete('tomadores/{tomador}', [TomadorController::class, 'destroy'])->middleware('permission:tomadores.delete')->name('tomadores.destroy');
    Route::get('servicos', [ServicoController::class, 'index'])->middleware('permission:servicos.view')->name('servicos.index');
    Route::post('servicos', [ServicoController::class, 'store'])->middleware('permission:servicos.create')->name('servicos.store');
    Route::put('servicos/{servico}', [ServicoController::class, 'update'])->middleware('permission:servicos.edit')->name('servicos.update');
    Route::delete('servicos/{servico}', [ServicoController::class, 'destroy'])->middleware('permission:servicos.delete')->name('servicos.destroy');

    Route::get('recorrencias', [RecorrenciaController::class, 'index'])->middleware('permission:recorrencias.view')->name('recorrencias.index');
    Route::post('recorrencias', [RecorrenciaController::class, 'store'])->middleware('permission:recorrencias.create')->name('recorrencias.store');
    Route::put('recorrencias/{recorrencia}', [RecorrenciaController::class, 'update'])->middleware('permission:recorrencias.edit')->name('recorrencias.update');
    Route::delete('recorrencias/{recorrencia}', [RecorrenciaController::class, 'destroy'])->middleware('permission:recorrencias.delete')->name('recorrencias.destroy');

    Route::get('fechamento', [FechamentoController::class, 'index'])->middleware('permission:fechamento.view')->name('fechamento.index');
    Route::get('fechamento/excel', [FechamentoController::class, 'excel'])->middleware('permission:fechamento.exportar')->name('fechamento.excel');
    Route::get('fechamento/zip', [FechamentoController::class, 'zip'])->middleware('permission:fechamento.exportar')->name('fechamento.zip');
    // System-wide settings: only the Administrador role, whatever the permission matrix says.
    Route::get('configuracoes', [SettingController::class, 'index'])->middleware('role:Administrador')->name('configuracoes.index');
    Route::post('configuracoes', [SettingController::class, 'update'])->middleware('role:Administrador')->name('configuracoes.update');
    // A1 certificates: throttled because the upload checks a password.
    Route::middleware(['role:Administrador', 'throttle:20,1'])->prefix('configuracoes/certificados')->name('certificados.')->group(function () {
        // Declared before the {emitente} routes so "sistema" is never taken for an id.
        Route::post('sistema', [CertificadoController::class, 'storeSistema'])->name('sistema.store');
        Route::post('sistema/testar', [CertificadoController::class, 'testarSistema'])->name('sistema.testar');
        Route::delete('sistema', [CertificadoController::class, 'destroySistema'])->name('sistema.destroy');
        Route::post('{emitente}', [CertificadoController::class, 'store'])->name('store');
        Route::post('{emitente}/testar', [CertificadoController::class, 'testar'])->name('testar');
        Route::delete('{emitente}', [CertificadoController::class, 'destroy'])->name('destroy');
    });

    // orders crud
    Route::get("/apps-ecommerce-orders", [OrderController::class, 'index'])->name('order-list');
    Route::post("order-create", [OrderController::class, 'store'])->name('order-create');
    Route::post("order-update", [OrderController::class, 'update'])->name('order-update');
    Route::post("order-delete", [OrderController::class, 'destroy'])->name('order-delete');

    Route::controller(VelzonRoutesController::class)->group(function () {

        // dashboard routes
        // Route::inertia('/', 'Dashboard')->name('index');
        Route::get("/dashboard-analytics", "dashboard_analytics");
        Route::get("/dashboard-crm", "dashboard_crm");
        Route::get("/dashboard-crypto", "dashboard_crypto");
        Route::get("/dashboard-projects", "dashboard_projects");
        Route::get("/dashboard-nft", "dashboard_nft");
        Route::get("/dashboard-job", "dashboard_job");
        Route::get("/dashboard-blog", "dashboard_blog");
        Route::get("/apps-calendar", "apps_calendar");
        Route::get("/apps-calendar-month-grid", "apps_calendar_month_grid");
        Route::get("/apps-ecommerce-products", "apps_ecommerce_products");
        Route::get("/apps-ecommerce-product-details/{id}", "apps_ecommerce_product_details");
        Route::get("/apps-ecommerce-product-details", "apps_ecommerce_product_details");
        Route::get("/apps-ecommerce-add-product", "apps_ecommerce_add_product");
        Route::get("/apps-ecommerce-order-details", "apps_ecommerce_order_details");
        Route::get("/apps-ecommerce-customers", "apps_ecommerce_customers");
        Route::get("/apps-ecommerce-cart", "apps_ecommerce_cart");
        Route::get("/apps-ecommerce-checkout", "apps_ecommerce_checkout");
        Route::get("/apps-ecommerce-sellers", "apps_ecommerce_sellers");
        Route::get("/apps-ecommerce-seller-details", "apps_ecommerce_seller_details");
        Route::get("/apps-file-manager", "apps_file_manager");
        Route::get("/apps-todo", "apps_todo");
        Route::get("/apps-chat", "apps_chat");
        Route::get("/apps-mailbox", "apps_mailbox");
        Route::get("/apps-email-basic", "apps_email_basic");
        Route::get("/apps-email-ecommerce", "apps_email_ecommerce");
        Route::get("/apps-projects-list", "apps_projects_list");
        Route::get("/apps-projects-overview", "apps_projects_overview");
        Route::get("/apps-projects-create", "apps_projects_create");
        Route::get("/apps-tasks-list-view", "apps_tasks_list_view");
        Route::get("/apps-tasks-details", "apps_tasks_details");
        Route::get("/apps-tasks-kanban", "apps_tasks_kanban");
        Route::get("/apps-api-key", "apps_api_key");
        Route::get("/apps-crm-contacts", "apps_crm_contacts");
        Route::get("/apps-crm-companies", "apps_crm_companies");
        Route::get("/apps-crm-deals", "apps_crm_deals");
        Route::get("/apps-crm-leads", "apps_crm_leads");
        Route::get("/apps-invoices-list", "apps_invoices_list");
        Route::get("/apps-invoices-details", "apps_invoices_details");
        Route::get("/apps-invoices-create", "apps_invoices_create");
        Route::get("/apps-tickets-list", "apps_tickets_list");
        Route::get("/apps-tickets-details", "apps_tickets_details");
        Route::get("/apps-crypto-transactions", "apps_crypto_transactions");
        Route::get("/apps-crypto-buy-sell", "apps_crypto_buy_sell");
        Route::get("/apps-crypto-orders", "apps_crypto_orders");
        Route::get("/apps-crypto-wallet", "apps_crypto_wallet");
        Route::get("/apps-crypto-ico", "apps_crypto_ico");
        Route::get("/apps-crypto-kyc", "apps_crypto_kyc");
        Route::get("/apps-nft-marketplace", "apps_nft_marketplace");
        Route::get("/apps-nft-collections", "apps_nft_collections");
        Route::get("/apps-nft-create", "apps_nft_create");
        Route::get("/apps-nft-creators", "apps_nft_creators");
        Route::get("/apps-nft-explore", "apps_nft_explore");
        Route::get("/apps-nft-item-details", "apps_nft_item_details");
        Route::get("/apps-nft-auction", "apps_nft_auction");
        Route::get("/apps-nft-ranking", "apps_nft_ranking");
        Route::get("/apps-nft-wallet", "apps_nft_wallet");
        Route::get("/charts-apex-line", "charts_apex_line");
        Route::get("/charts-apex-area", "charts_apex_area");
        Route::get("/charts-apex-column", "charts_apex_column");
        Route::get("/charts-apex-bar", "charts_apex_bar");
        Route::get("/charts-apex-mixed", "charts_apex_mixed");
        Route::get("/charts-apex-timeline", "charts_apex_timeline");
        Route::get("/charts-apex-range-area", "charts_apex_range_area");
        Route::get("/charts-apex-funnel", "charts_apex_funnel");
        Route::get("/charts-apex-candlestick", "charts_apex_candlestick");
        Route::get("/charts-apex-boxplot", "charts_apex_boxplot");
        Route::get("/charts-apex-bubble", "charts_apex_bubble");
        Route::get("/charts-apex-scatter", "charts_apex_scatter");
        Route::get("/charts-apex-heatmap", "charts_apex_heatmap");
        Route::get("/charts-apex-treemap", "charts_apex_treemap");
        Route::get("/charts-apex-pie", "charts_apex_pie");
        Route::get("/charts-apex-radialbar", "charts_apex_radialbar");
        Route::get("/charts-apex-radar", "charts_apex_radar");
        Route::get("/charts-apex-polar", "charts_apex_polar");
        Route::get("/charts-apex-slope", "charts_apex_slope");
        Route::get("/charts-chartjs", "charts_chartjs");
        Route::get("/charts-echarts", "charts_echarts");
        Route::get("/ui-alerts", "ui_alerts");
        Route::get("/ui-badges", "ui_badges");
        Route::get("/ui-buttons", "ui_buttons");
        Route::get("/ui-colors", "ui_colors");
        Route::get("/ui-cards", "ui_cards");
        Route::get("/ui-carousel", "ui_carousel");
        Route::get("/ui-dropdowns", "ui_dropdowns");
        Route::get("/ui-grid", "ui_grid");
        Route::get("/ui-images", "ui_images");
        Route::get("/ui-tabs", "ui_tabs");
        Route::get("/ui-accordions", "ui_accordions");
        Route::get("/ui-modals", "ui_modals");
        Route::get("/ui-offcanvas", "ui_offcanvas");
        Route::get("/ui-placeholders", "ui_placeholders");
        Route::get("/ui-progress", "ui_progress");
        Route::get("/ui-notifications", "ui_notifications");
        Route::get("/ui-media", "ui_media");
        Route::get("/ui-embed-video", "ui_embed_video");
        Route::get("/ui-typography", "ui_typography");
        Route::get("/ui-lists", "ui_lists");
        Route::get("/ui-links", "ui_links");
        Route::get("/ui-general", "ui_general");
        Route::get("/ui-ribbons", "ui_ribbons");
        Route::get("/ui-utilities", "ui_utilities");
        Route::get("/advance-ui-scrollbar", "advance_ui_scrollbar");
        Route::get("/advance-ui-animation", "advance_ui_animation");
        Route::get("/advance-ui-swiper", "advance_ui_swiper");
        Route::get("/advance-ui-ratings", "advance_ui_ratings");
        Route::get("/advance-ui-highlight", "advance_ui_highlight");
        Route::get("/widgets", "widgets");
        Route::get("/forms-elements", "forms_elements");
        Route::get("/forms-select", "forms_select");
        Route::get("/forms-checkboxes-radios", "forms_checkboxes_radios");
        Route::get("/forms-pickers", "forms_pickers");
        Route::get("/forms-masks", "forms_masks");
        Route::get("/forms-advanced", "forms_advanced");
        Route::get("/forms-range-sliders", "forms_range_sliders");
        Route::get("/forms-validation", "forms_validation");
        Route::get("/forms-wizard", "forms_wizard");
        Route::get("/forms-editors", "forms_editors");
        Route::get("/forms-file-uploads", "forms_file_uploads");
        Route::get("/forms-layouts", "forms_layouts");
        Route::get("/forms-select2", "forms_select2");
        Route::get("/tables-basic", "tables_basic");
        Route::get("/tables-listjs", "tables_listjs");
        Route::get("/tables-react", "tables_react");
        Route::get("/icons-remix", "icons_remix");
        Route::get("/icons-boxicons", "icons_boxicons");
        Route::get("/icons-materialdesign", "icons_materialdesign");
        Route::get("/icons-feather", "icons_feather");
        Route::get("/icons-lineawesome", "icons_lineawesome");
        Route::get("/icons-crypto", "icons_crypto");
        Route::get("/maps-google", "maps_google");
        Route::get("/pages-starter", "pages_starter");
        Route::get("/pages-profile", "pages_profile");
        Route::get("/pages-profile-settings", "pages_profile_settings");
        Route::get("/pages-team", "pages_team");
        Route::get("/pages-timeline", "pages_timeline");
        Route::get("/pages-faqs", "pages_faqs");
        Route::get("/pages-gallery", "pages_gallery");   
        Route::get("/pages-pricing", "pages_pricing");
        Route::get("/pages-sitemap", "pages_sitemap");
        Route::get("/pages-search-results", "pages_search_results");
        Route::get("/apps-job-statistics", "apps_job_statistics");
        Route::get("/apps-job-lists", "apps_job_lists");
        Route::get("/apps-job-grid-lists", "apps_job_grid_lists");
        Route::get("/apps-job-details", "apps_job_details");
        Route::get("/apps-job-candidate-lists", "apps_job_candidate_lists");
        Route::get("/apps-job-candidate-grid", "apps_job_candidate_grid");
        Route::get("/apps-job-application", "apps_job_application");
        Route::get("/apps-job-new", "apps_job_new");
        Route::get("/apps-job-companies-lists", "apps_job_companies_lists");
        Route::get("/apps-job-categories", "apps_job_categories");
        Route::get("/pages-privacy-policy", "pages_privacy_policy");
        Route::get("/pages-terms-condition", "pages_terms_condition");
        Route::get("/pages-blog-list", "pages_blog_list");
        Route::get("/pages-blog-grid", "pages_blog_grid");
        Route::get("/pages-blog-overview", "pages_blog_overview");
        Route::get("/forgot-password", "forgot_password");
        Route::get("/auth-signin-basic", "auth_signin_basic");
        Route::get("/auth-signin-cover", "auth_signin_cover");
        Route::get("/auth-signup-basic", "auth_signup_basic");
        Route::get("/auth-signup-cover", "auth_signup_cover");
        Route::get("/auth-pass-reset-basic", "auth_pass_reset_basic");
        Route::get("/auth-pass-reset-cover", "auth_pass_reset_cover");
        Route::get("/auth-lockscreen-basic", "auth_lockscreen_basic");
        Route::get("/auth-lockscreen-cover", "auth_lockscreen_cover");
        Route::get("/auth-logout-basic", "auth_logout_basic");
        Route::get("/auth-logout-cover", "auth_logout_cover");
        Route::get("/auth-success-msg-basic", "auth_success_msg_basic");
        Route::get("/auth-success-msg-cover", "auth_success_msg_cover");
        Route::get("/auth-twostep-basic", "auth_twostep_basic");
        Route::get("/auth-twostep-cover", "auth_twostep_cover");
        Route::get("/auth-404-basic", "auth_404_basic");
        Route::get("/auth-404-cover", "auth_404_cover");
        Route::get("/auth-404-alt", "auth_404_alt");
        Route::get("/auth-500", "auth_500");       
        Route::get("/landing", "landing");
        Route::get("/nft-landing", "nft_landing");
        Route::get("/job-landing", "job_landing");
        Route::get("/auth-pass-change-basic", "auth_pass_change_basic");
        Route::get("/auth-pass-change-cover", "auth_pass_change_cover");
        Route::get("/auth-offline", "auth_offline");      
        Route::get("/pages-maintenance", "pages_maintenance");
        Route::get("/pages-coming-soon", "pages_coming_soon");
    });

    // módulos (sidebar) + RBAC
    Route::middleware('permission:modulos.view')->get('/modulos', [ModuleController::class, 'index'])->name('modules.index');
    Route::middleware('permission:modulos.create')->post('/modulos', [ModuleController::class, 'store'])->name('modules.store');
    Route::middleware('permission:modulos.edit')->put('/modulos/{module}', [ModuleController::class, 'update'])->name('modules.update');
    Route::middleware('permission:modulos.delete')->delete('/modulos/{module}', [ModuleController::class, 'destroy'])->name('modules.destroy');

    Route::middleware('permission:papeis-permissoes.view')->get('/papeis', [RoleController::class, 'index'])->name('roles.index');
    Route::middleware('permission:papeis-permissoes.create')->post('/papeis', [RoleController::class, 'store'])->name('roles.store');
    Route::middleware('permission:papeis-permissoes.edit')->put('/papeis/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::middleware('permission:papeis-permissoes.delete')->delete('/papeis/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    Route::middleware('permission:usuarios.view')->get('/usuarios', [UserController::class, 'index'])->name('users.index');
    Route::middleware('permission:usuarios.create')->post('/usuarios', [UserController::class, 'store'])->name('users.store');
    Route::middleware('permission:usuarios.edit')->put('/usuarios/{user}', [UserController::class, 'update'])->name('users.update');
    Route::middleware('permission:usuarios.delete')->delete('/usuarios/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // emitentes: cada ação também passa pela EmitentePolicy (permissão do módulo + escopo por emitente)
    Route::get('/emitentes', [EmitenteController::class, 'index'])->name('emitentes.index');
    Route::get('/emitentes/consultar-cnpj/{cnpj}', [EmitenteController::class, 'consultarCnpj'])->name('emitentes.consultar-cnpj');
    Route::post('/emitentes', [EmitenteController::class, 'store'])->name('emitentes.store');
    Route::put('/emitentes/{emitente}', [EmitenteController::class, 'update'])->name('emitentes.update');
    Route::delete('/emitentes/{emitente}', [EmitenteController::class, 'destroy'])->name('emitentes.destroy');
});

require __DIR__.'/auth.php';
