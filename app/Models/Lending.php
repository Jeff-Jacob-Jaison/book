<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lending extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'issued_at',
        'due_date',
        'returned_at',
        'status',
    ];

    protected $casts = [
        'issued_at' => 'datetime',
        'due_date' => 'datetime',
        'returned_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function fine()
    {
        return $this->hasOne(Fine::class);
    }
}
