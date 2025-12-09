<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6, true);
        
        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'excerpt' => fake()->paragraph(2),
            'content' => fake()->paragraphs(5, true),
            'image_url' => 'https://placehold.co/600x400',
            'category' => fake()->randomElement(['Kerjasama', 'Media Partner', 'Event', 'Pengumuman']),
            'author' => fake()->name(),
            'published_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'is_published' => true,
        ];
    }
}
