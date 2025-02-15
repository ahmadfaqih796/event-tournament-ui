<?php

namespace App\Policies;

use App\Models\News;
use App\Models\User;

class NewsPolicy
{
    public function create(User $user)
    {
        return in_array($user->role, ['admin', 'komunitas']);
    }

    public function update(User $user, News $news)
    {
        return $user->id === $news->created_by || $user->role === 'admin';
    }

    public function delete(User $user, News $news)
    {
        return $user->id === $news->created_by || $user->role === 'admin';
    }
}
