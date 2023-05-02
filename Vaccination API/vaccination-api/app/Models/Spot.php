<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spot extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'regional_id',
        'name',
        'address',
        'serve',
        'capacity',
    ];

    public function regionals()
    {
        return $this->hasMany(Regional::class, 'regional_id');
    }

    public function spot_vaccines()
    {
        return $this->hasMany(SpotVaccine::class);
    }

    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class);
    }
}
