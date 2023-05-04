<?php

namespace App\Http\Middleware;

use App\Http\Requests\LoginRequest;
use App\Models\Society;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $password = $request->password;
        $society = Society::where("id_card_number", $request->id_card_number)->first();

        if(!$society || $password !== $society->password){
            return response([
                "message" => "ID Card Number or Password incorrect",
            ], 401);
        }
        return $next($request);
    }
}
