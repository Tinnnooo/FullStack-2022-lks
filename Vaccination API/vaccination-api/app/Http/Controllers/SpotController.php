<?php

namespace App\Http\Controllers;

use App\Http\Resources\DetailSpotResource;
use App\Http\Resources\SpotCollection;
use App\Http\Resources\SpotResource;
use App\Models\Society;
use App\Models\Spot;
use App\Models\Vaccination;
use Illuminate\Http\Request;

class SpotController extends Controller
{
    public function getSpotsByRegion(Request $request)
    {
        $society = Society::where('login_tokens', $request->token)->first();

        $regional_id = $society->regional_id;

        $data = Spot::where('regional_id', $regional_id)->get();

        return new SpotCollection($data);
    }

    public function getSpotBySpotId(Request $request, $spot_id)
    {
        $date = $request->date ?? date("Y-m-d");
        $detailSpot = Spot::where('id', $spot_id)->first();
        $vaccinationCount = Vaccination::where('spot_id', $detailSpot->id)->where('date', $date)->count();

        return response([
            "date" => date("M d, Y", strtotime($date)),
            "spot" => DetailSpotResource::make($detailSpot),
            "vaccination_count" => $vaccinationCount
        ]);
    }
}
