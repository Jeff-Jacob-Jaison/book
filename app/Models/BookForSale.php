<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookForSale extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'author',
        'price',
        'description',
        'condition',
        'status',
        'cover_image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
