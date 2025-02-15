<?php

namespace App\Policies;

use App\Models\TournamentRegistration;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TournamentRegistrationPolicy
{
    public function create(User $user)
    {
        return in_array($user->role, ['admin', 'komunitas', 'peserta']);
    }

    public function update(User $user, TournamentRegistration $news)
    {
        return in_array($user->role, ['admin', 'komunitas']);
        // return $user->id === $news->created_by || $user->role === 'admin';
    }

    public function delete(User $user, TournamentRegistration $data)
    {
        return in_array($user->role, ['admin', 'komunitas', 'peserta']);
        // return $user->id == $data->payment_by;
    }
}
