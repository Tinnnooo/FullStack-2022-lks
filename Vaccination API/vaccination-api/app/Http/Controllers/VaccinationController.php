<?php

namespace App\Http\Controllers;

use App\Http\Resources\VaccinationResource;
use DateTime;
use App\Models\Society;
use App\Models\Vaccination;
use App\Models\Consultation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VaccinationController extends Controller
{
    public function registerVaccination(Request $request)
    {

        $society = Society::where('login_tokens', $request->token)->first();
        $isVaccination = Vaccination::where('society_id', $society->id)->get();
        $vaccinationCount = $isVaccination->count();

        $request->merge([
            "dose" => ($vaccinationCount == 0 ? "1" : "2"),
            "society_id" => $society->id,
        ]);

        $validator = Validator::make($request->all(), [
            "dose" => "required",
            "date" => 'required|date',
            "society_id" => "required",
            "spot_id" => 'required',
            "vaccine_id" => "nullable",
            "doctor_id" => "nullable",
            "officer_id" => "nullable",
        ]);

        if ($validator->fails()) {
            return response([
                "message" => "Invalid field",
                "errors" => $validator->errors(),
            ], 422);
        }


        $isConsultationAccept = Consultation::where('society_id', $society->id)->where('status', "accepted")->count();

        if (!$isConsultationAccept) {
            return response([
                "message" => "Your consultation must be accepted by doctor before"
            ], 401);
        }

        if ($vaccinationCount >= 2) {
            return response([
                "message" => "Society has been 2x vaccinated"
            ], 401);
        }

        $firstVaccination = $isVaccination->first();
        $defaultDate = Carbon::createFromFormat("Y-m-d", $firstVaccination->date);
        $dateRule = Carbon::parse($defaultDate->addDays(30))->format("Y-m-d");
        $currentDate = Carbon::now()->format('Y-m-d');

        if ($currentDate < $dateRule) {
            return response([
                "message" => "Wait at least +30 days from 1st Vaccination"
            ], 401);
        }

        $data = $validator->validated();

        Vaccination::create($data);

        return response([
            "message" => ($vaccinationCount = 0 ? "First " : "Second ") . "vaccination registered successful"
        ], 200);
    }

    public function getAllSocietyVaccinations(Request $request)
    {
        $society = Society::where('login_tokens', $request->token)->first();

        $vaccinations = Vaccination::where('society_id', $society->id)->get();

        return new VaccinationResource($vaccinations);
    }
}
