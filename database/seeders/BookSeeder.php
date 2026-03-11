<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            [
                'title' => 'Neon Twilight',
                'author' => 'Aries Vance',
                'isbn' => '978-3-16-148410-0',
                'published_year' => 2021,
                'quantity' => 5,
                'available_qty' => 5,
                'description' => 'A thrilling sci-fi adventure in a cyberpunk metropolis.',
                'cover_image' => 'collection_book_cover_scifi_1772048319648.png',
            ],
            [
                'title' => 'The Crystal Crown',
                'author' => 'Elara Moon',
                'isbn' => '978-3-16-148410-1',
                'published_year' => 2018,
                'quantity' => 3,
                'available_qty' => 3,
                'description' => 'An epic fantasy journey to reclaim a lost kingdom.',
                'cover_image' => 'collection_book_cover_fantasy_1772048215433.png',
            ],
            [
                'title' => 'The Silent Echo',
                'author' => 'Julian Cross',
                'isbn' => '978-3-16-148410-2',
                'published_year' => 2023,
                'quantity' => 4,
                'available_qty' => 4,
                'description' => 'A gripping mystery novel where nothing is as it seems.',
                'cover_image' => 'collection_book_cover_mystery_1772048379658.png',
            ],
            [
                'title' => 'Empires of Dust',
                'author' => 'Dr. Aris Thorne',
                'isbn' => '978-3-16-148410-3',
                'published_year' => 2015,
                'quantity' => 2,
                'available_qty' => 2,
                'description' => 'A historical deep dive into the fall of ancient civilizations.',
                'cover_image' => 'collection_book_cover_history_1772048474201.png',
            ],
            [
                'title' => 'Cybernetic Dawn',
                'author' => 'Aries Vance',
                'isbn' => '978-3-16-148410-4',
                'published_year' => 2024,
                'quantity' => 6,
                'available_qty' => 6,
                'description' => 'The prequel to Neon Twilight, exploring the rise of AI.',
                'cover_image' => 'collection_book_cover_scifi_1772048319648.png',
            ],
            [
                'title' => 'Shadows of Rome',
                'author' => 'Dr. Aris Thorne',
                'isbn' => '978-3-16-148410-5',
                'published_year' => 2019,
                'quantity' => 3,
                'available_qty' => 3,
                'description' => 'A historical fiction set in the heart of the Roman Empire.',
                'cover_image' => 'collection_book_cover_history_1772048474201.png',
            ],
            [
                'title' => 'Starship Echoes',
                'author' => 'Nova Steele',
                'isbn' => '978-3-16-148410-6',
                'published_year' => 2022,
                'quantity' => 4,
                'available_qty' => 4,
                'description' => 'A space opera following a crew on a generational ship.',
                'cover_image' => 'collection_book_cover_scifi_1772048319648.png',
            ],
            [
                'title' => 'The Lost Kingdom',
                'author' => 'Elara Moon',
                'isbn' => '978-3-16-148410-7',
                'published_year' => 2020,
                'quantity' => 5,
                'available_qty' => 5,
                'description' => 'The sequel to The Crystal Crown.',
                'cover_image' => 'collection_book_cover_fantasy_1772048215433.png',
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}
