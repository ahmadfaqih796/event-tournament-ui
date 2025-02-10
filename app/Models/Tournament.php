<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'name',
        'game',
        'status'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    // public function matches()
    // {
    //     return $this->hasMany(Match::class);
    // }

    // public function registrations()
    // {
    //     return $this->hasMany(TournamentRegistration::class);
    // }
}
