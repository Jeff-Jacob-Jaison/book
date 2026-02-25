<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'published_year',
        'quantity',
        'available_qty',
        'description',
        'cover_image',
    ];

    public function lendings()
    {
        return $this->hasMany(Lending::class);
    }
}
