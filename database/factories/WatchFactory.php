<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class WatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $prod_name = fake()->words(random_int(1, 4));
        $brands = ['Rolex', 'Q&Q', 'Xiaomi', 'Huawei'];

        return [
            'watch_name' => join(' ', $prod_name),
            'slug' => join('_', $prod_name),
            'description' => fake()->text(100),
            'price' => fake()->randomFloat(2, 200000, 2500000),
            'brand' => fake()->randomElement($brands),
            'stock' => fake()->randomNumber(2),
            'image' => fake()->imageUrl(),
            'category_id' => Category::inRandomOrder()->first()->category_id
        ];
    }
}
