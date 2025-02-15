<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Financial extends Model
{
    use HasFactory;

    protected $fillable = [
        'tr_id',
        'event_name',
        'tournament_name',
        'game_name',
        'price',
        'pay',
        'paid_by'
    ];

    public function transaction()
    {
        return $this->belongsTo(TournamentRegistration::class, 'tr_id');
    }
}
