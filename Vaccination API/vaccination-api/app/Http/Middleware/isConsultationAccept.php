<?php

namespace App\Http\Middleware;

use App\Models\Consultation;
use App\Models\Society;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isConsultationAccept
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $society = Society::where('login_tokens', $request->token)->first();
        $consultations = Consultation::where('society_id', $society->id)->where('status', 'accepted')->first();

        if(!$consultations){
            return response([
                "message" => "Your consultation must be accepted by doctor before",
            ]);
        }

        return $next($request);
    }
}
