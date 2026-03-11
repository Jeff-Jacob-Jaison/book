<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$books = \App\Models\Book::orderBy('updated_at', 'desc')->take(2)->get();
foreach ($books as $book) {
    if ($book->uploader_id) {
        $user = \App\Models\User::find($book->uploader_id);
        echo "Uploader ID: {$book->uploader_id} | Email: " . ($user ? $user->email : 'USER NOT FOUND') . "\n";
    }
}
