<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VaccinationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $firstVaccination = $this->first();
        $secondVaccination = $this->skip(1)->first();
        return [
            "vaccinations" => [
                "first" => FirstVaccinationResource::make($firstVaccination),
                "second" => SecondVaccinationResource::make($secondVaccination),
            ]
        ];
    }
}
