<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'society_id',
        'doctor_id',
        'status',
        'disease_history',
        'current_symptoms',
        'doctor_notes',
    ];

    public function doctor()
    {
        return $this->belongsTo(Medical::class, 'doctor_id');
    }
}
