<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$books = \App\Models\Book::orderBy('updated_at', 'desc')->take(5)->get();
foreach ($books as $book) {
    echo "ID: {$book->id} | Title: {$book->title} | Status: {$book->status} | Uploader ID: " . ($book->uploader_id ?? 'NULL') . "\n";
}
