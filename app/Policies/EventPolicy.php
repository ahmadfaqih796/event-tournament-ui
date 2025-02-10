<?php

namespace App\Policies;

use App\Models\Event;
use App\Models\User;

class EventPolicy
{


    public function authorization(User $user)
    {
        return in_array($user->role, ['admin', 'komunitas']);
    }
}
