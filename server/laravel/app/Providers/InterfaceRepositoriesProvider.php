<?php


namespace App\Providers;

use App\Repositories\Defines\AddressWalletService;
use App\Repositories\Interfaces\AddressWalletServiceInterFace;
use Illuminate\Support\ServiceProvider;

class InterfaceRepositoriesProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(AddressWalletServiceInterFace::class,AddressWalletService::class);
    }

}
