<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpotVaccine extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "spot_id",
        "vaccine_id",
    ];

    public function spot()
    {
        return $this->belongsTo(Spot::class, 'spot_id');
    }

    public function vaccine()
    {
        return $this->belongsTo(Vaccine::class, 'vaccine_id');
    }
}
