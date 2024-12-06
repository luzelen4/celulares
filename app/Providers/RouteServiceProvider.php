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
        Route::middleware(['web'])  // Asegura que las rutas web se manejen con el middleware 'web'
             ->namespace($this->namespace)  // Usa el namespace de los controladores
             ->group(base_path('routes/web.php'));  // Carga las rutas definidas en web.php
    }

    /**
     * Mapea las rutas para la API.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')  // Prefijo para las rutas de API
             ->middleware(['api'])  // Aplica el middleware 'api' para estas rutas
             ->namespace($this->namespace)  // Usa el mismo namespace para los controladores de la API
             ->group(base_path('routes/api.php'));  // Carga las rutas definidas en api.php
    }
}
