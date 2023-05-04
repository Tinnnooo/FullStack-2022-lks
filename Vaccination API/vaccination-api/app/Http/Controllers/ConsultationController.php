<?php

namespace App\Http\Controllers;

use App\Models\Society;
use App\Models\Consultation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreConsultationRequest;
use App\Http\Resources\ConsultationResource;
use App\Http\Resources\ConsultationCollection;

class ConsultationController extends Controller
{
    public function requestConsultation(StoreConsultationRequest $request)
    {

        $data = $request->validated();

        $society = Society::where('login_tokens', $request->token)->first();

        $data['society_id'] = $society->id;
        $data['status'] = "pending";

        Consultation::create($data);


        return response([
            "message" => "Request consultation sent successful",
        ], 200);
    }

    public function getConsultations(Request $request)
    {

        $society = Society::where('login_tokens', $request->token)->first();

        $consultations = Consultation::where('society_id', $society->id)->get();

        return new ConsultationCollection($consultations);
    }
}
