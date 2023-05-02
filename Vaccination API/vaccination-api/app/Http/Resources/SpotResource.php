<?php

namespace App\Http\Resources;

use App\Models\Vaccine;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $available = [];
        $notAvailable = [];

        foreach ($this->spot_vaccines as $spotVaccines) {
            $available[$spotVaccines->vaccine->name] = true;
        }

        $vaccines = Vaccine::pluck('name');
        foreach ($vaccines as $vaccine) {
            if (!isset($available[$vaccine])) {
                $notAvailable[$vaccine] = false;
            }
        }

        return [
            "id" => $this->id,
            "name" => $this->name,
            "address" => $this->address,
            "serve" => $this->serve,
            "capacity" => $this->capacity,
            "available_vaccines" => $available + $notAvailable,
        ];
    }
}
