<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'type',
        'genre',
        'author',
        'isbn',
        'published_year',
        'quantity',
        'available_qty',
        'description',
        'cover_image',
        'file_path',
        'is_available',
        'price',
        'uploader_id',
        'status',
    ];

    public function lendings()
    {
        return $this->hasMany(Lending::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploader_id');
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }
}
