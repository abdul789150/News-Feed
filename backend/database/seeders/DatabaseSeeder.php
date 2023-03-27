<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(2)->create();

        // News Sources
        \App\Models\Source::factory()->create([
            'name' => 'New York Times',
            'api_key' => 'Lv5k9ShVtLsgaujpjd7woaW3Maun6eP6',
        ]);
        \App\Models\Source::factory()->create([
            'name' => 'The Guardian',
            'api_key' => '93ec40c6-4caa-492f-9e57-80260f52c7b0',
        ]);
        \App\Models\Source::factory()->create([
            'name' => 'News API',
            'api_key' => '10cfa295ca824088adbb6fc1b4022132',
        ]);

        // News Categories
        $categories = [
            [
                'name' => 'Business',
                'category_search_name' => 'business'
            ],
            [
                'name' => 'Education',
                'category_search_name' => 'education'
            ],
            [
                'name' => 'Food',
                'category_search_name' => 'food'
            ],
            [
                'name' => 'Technology',
                'category_search_name' => 'technology'
            ],
            [
                'name' => 'Science',
                'category_search_name' => 'science'
            ],
            [
                'name' => 'Travel',
                'category_search_name' => 'travel'
            ],
            [
                'name' => 'World News',
                'category_search_name' => 'world'
            ],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::factory()->create([
                'name' => $category['name'],
                'category_search_name' => $category['category_search_name'],
            ]);
        }
    }
}
