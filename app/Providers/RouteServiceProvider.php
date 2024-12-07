<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * El nombre del espacio de nombres para los controladores.
     *
     * @var string
     */
    protected $namespace = 'App\\Http\\Controllers';

    /**
     * Defina las rutas para la aplicación.
     *
     * @return void
     */
    public function map()
    {
        $this->mapWebRoutes();
        $this->mapApiRoutes();
    }

    /**
     * Mapea las rutas para la interfaz web.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware(['web'])  
             ->namespace($this->namespace)  
             ->group(base_path('routes/web.php'));  
    }

    /**
     * Mapea las rutas para la API.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')  
             ->middleware(['api'])  
             ->namespace($this->namespace)  
             ->group(base_path('routes/api.php'));  
    }
}
