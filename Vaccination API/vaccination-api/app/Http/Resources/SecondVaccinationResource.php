<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\SpotVaccinationResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SecondVaccinationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "queue" => '1',
            "dose" => $this->dose,
            "vaccination_date" => $this->date,
            "spot" => SpotVaccinationResource::make($this->spot),
            "status" => ($this->date < date('Y-m-d') ? "done" : "undone"),
            "vaccine" => $this->vaccine,
            "vaccinator" => $this->doctor,
        ];
    }
}
