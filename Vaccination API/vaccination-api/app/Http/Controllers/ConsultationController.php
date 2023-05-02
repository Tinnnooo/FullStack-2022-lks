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
    public function requestConsultation(Request $request)
    {

        $society = Society::where('login_tokens', $request->token)->first();

        $request->merge([
            'society_id' => $society->id,
            'status' => "pending"
        ]);

        // $data = $request->all();
        // $data['society_id'] = $society->id;
        // $data['doctor_id'] = $society->id;
        // $data['status'] = "pending";


        $validator = Validator::make($request->all(), [
            'society_id' => 'required',
            'doctor_id' => 'nullable',
            'status' => 'required',
            'disease_history' => 'nullable|string',
            'current_symptoms' => 'nullable|string',
            'doctor_notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response([
                "message" => "Invalid data",
                "error" => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

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
