<?php

namespace App\Http\Middleware;

use App\Models\Society;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TokenCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $token = $request->token;

        if (!$token) {
            return $this->notAuthorized();
        }

        $society = Society::where("login_tokens", $token)->first();

        if (!$society) {
            return $this->notAuthorized();
        }

        return $next($request);
    }

    private function notAuthorized()
    {
        return response()->json([
            "Unauthorized user"
        ], 401);
    }
}
