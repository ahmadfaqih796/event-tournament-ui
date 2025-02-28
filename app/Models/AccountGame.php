<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountGame extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'game_id',
        'name',
        'account',
    ];

    public function userAccount()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id', 'name');
    }

    public function game()
    {
        return $this->belongsTo(User::class, 'game_id')->select('id', 'name');
    }
}
