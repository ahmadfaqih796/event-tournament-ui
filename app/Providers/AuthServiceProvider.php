<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        'App\Models\Model\Event' => 'App\Policies\EventPolicy',
        'App\Models\Model\News' => 'App\Policies\NewsPolicy',
        'App\Models\Model\TournamentRegistration' => 'App\Policies\TournamentRegistrationPolicy',
        // Event::class => EventPolicy::class,

    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('authorization', function (User $user) {
            return in_array($user->role, ['admin', 'komunitas']);
        });
    }
}
