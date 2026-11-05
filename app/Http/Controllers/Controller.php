<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Runs a write and answers with a flash message instead of a 500 page.
     *
     * Only the persistence goes in $acao: validation and authorization run before it, and their
     * exceptions (422/403) are rethrown untouched. Anything else is logged with context and the
     * user gets a plain message; the exception text never reaches the screen.
     *
     * @param  array<string, mixed>  $contexto  extra fields for the log line
     */
    protected function executar(callable $acao, string $sucesso, string $falha, array $contexto = []): RedirectResponse
    {
        try {
            $acao();

            return back()->with('success', $sucesso);
        } catch (ValidationException|AuthorizationException|HttpExceptionInterface $e) {
            throw $e;
        } catch (Throwable $e) {
            Log::error($falha, [
                ...$contexto,
                'user_id' => auth()->id(),
                'exception' => $e,
            ]);

            return back()->with('error', $falha);
        }
    }
}
