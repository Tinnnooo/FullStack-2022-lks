<?php

namespace App\Http\Controllers;

use App\Http\Middleware\isConsultationAccept;
use App\Http\Middleware\isVaccinationAccept;
use App\Http\Middleware\VaccinationCheck;
use App\Http\Requests\VaccinationRequest;
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
    public function register(VaccinationRequest $request)
    {
        $societyId = $request->get('societyId');

        $data = $request->validated();
        $data['society_id'] = $societyId;

        Vaccination::create($data);

        $vaccinationCount = $request->get('vaccinationCount');

        return response([
            "message" => $vaccinationCount = 0 ? "First " : "Second " . "vaccination registered successful"
        ], 200);
    }

    public function __construct()
    {
        $this->middleware(isConsultationAccept::class)->only('register');
        $this->middleware(VaccinationCheck::class)->only('register');
    }

    public function getMyVaccination(Request $request)
    {
        $society = Society::where('login_tokens', $request->token)->first();

        $vaccinations = Vaccination::where('society_id', $society->id)->take(2)->get();

        return new VaccinationResource($vaccinations);
    }
}
