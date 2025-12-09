<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Souvenir>
 */
class SouvenirFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(10),
            'price' => fake()->numberBetween(10000, 500000),
            'image_url' => 'https://placehold.co/400x400',
            'category' => fake()->randomElement(['Kaos', 'Gantungan Kunci', 'Tas', 'Alat Musik']),
            'stock' => fake()->numberBetween(10, 100),
        ];
    }
}
