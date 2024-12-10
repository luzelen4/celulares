<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PhoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $prod_name = fake()->words(random_int(1, 4));
        $marcas = ['Motorola', 'Huawei', 'Xiaomi', 'Samsung', 'Poco', 'Vivo', 'Oppo', 'Apple'];

        return [
            'nombre_celular' => join(' ', $prod_name),
            'slug' => join('_', $prod_name),
            'descripcion' => fake()->text(100),
            'precio' => fake()->randomFloat(2, 200000, 2500000),
            'marca' => fake()->randomElement($marcas),
            'cantidad_en_bodega' => fake()->randomNumber(2),
            'url_imagen' => fake()->imageUrl(),
            'cod_categoria' => Category::inRandomOrder()->first()->cod_categoria
        ];
    }
}
