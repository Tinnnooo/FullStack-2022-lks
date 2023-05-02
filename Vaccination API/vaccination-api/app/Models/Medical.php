<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medical extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "spot_id",
        "user_id",
        "role",
        "name",
    ];

    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class);
    }
}
