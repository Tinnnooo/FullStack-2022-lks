<?php

namespace App\Http\Controllers;

use DateTime;
use App\Models\Society;
use App\Models\Vaccination;
use App\Models\Consultation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VaccinationController extends Controller
{
    public function registerVaccination(Request $request)
    {
        $society = Society::where('login_tokens', $request->token)->first();
        $isVaccination = Vaccination::where('society_id', $society->id)->get();
        $vaccinationCount = $isVaccination->count();
        $isConsultationAccept = Consultation::where('society_id', $society->id)->where('status', "accepted")->count();
        if (!$isConsultationAccept) {
            return response([
                "message" => "Your consultation must be accepted by doctor before"
            ], 401);
        }

        $date = $isVaccination->first()->date;
        $date->addDays(30);

        return $date;


        if ($date)

            $validator = Validator::make($request->all(), [
                "date" => 'required|date',
                "spot_id" => 'required',
            ]);

        if ($validator->fails()) {
            return response([
                "message" => "Invalid field",
                "errors" => $validator->errors(),
            ], 422);
        }
    }
}
