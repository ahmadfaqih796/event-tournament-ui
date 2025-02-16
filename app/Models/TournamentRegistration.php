<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TournamentRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'tournament_id',
        'team_id',
        'payment_by',
        'payment_status',
        'payment_proof'
    ];

    public function payBy()
    {
        return $this->belongsTo(User::class, 'payment_by')->select('id', 'name');
    }

    public function tournament()
    {
        return $this->belongsTo(Tournament::class)->select('id', 'name', 'game', 'price', 'event_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
