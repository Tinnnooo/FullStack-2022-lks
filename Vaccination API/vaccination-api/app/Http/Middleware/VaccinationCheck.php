<?php

namespace App\Http\Middleware;

use App\Models\Society;
use App\Models\Vaccination;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VaccinationCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $society = Society::where('login_tokens', $request->token)->first();
        $vaccination = Vaccination::where('society_id', $society->id)->limit(2)->get();

        if($vaccination->count() >= 2){
            return response([
                "message" => "Society has been 2x vaccinated",
            ], 401);
        }

        if($vaccination->first()){
            $firstVaccination = $vaccination->first();
            $firstVaccinationDate = Carbon::createFromFormat("Y-m-d", $firstVaccination->date);
            $firstAfter30Days = Carbon::parse($firstVaccinationDate->addDays(30))->format("Y-m-d");

            if($request->date < $firstAfter30Days){
                return response([
                    "message" => "Wait at least +30 days from 1st Vaccination",
                ], 401);
            }
        }

        $request->attributes->add(["vaccinationCount" => $vaccination->count(), "societyId" => $society->id]);

        return $next($request);
    }
}
