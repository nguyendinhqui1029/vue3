<?php


namespace App\Providers;

use App\Services\Defines\AuthService;

use App\Services\Defines\CalculatePointService;
use App\Services\Defines\UserService;
use App\Services\Interfaces\AuthServiceInterFace;

use App\Services\Interfaces\CalculatePointServiceInterFace;
use App\Services\Interfaces\UserServiceInterFace;
use Illuminate\Support\ServiceProvider;
use function Psy\bin;

class InterfaceServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(AuthServiceInterFace::class,AuthService::class);
        $this->app->bind(UserServiceInterFace::class,UserService::class);
        $this->app->bind(CalculatePointServiceInterFace::class,CalculatePointService::class);

    }

}
