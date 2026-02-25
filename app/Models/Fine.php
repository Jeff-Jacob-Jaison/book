<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fine extends Model
{
    protected $fillable = [
        'lending_id',
        'user_id',
        'amount',
        'paid',
    ];

    protected $casts = [
        'paid' => 'boolean',
    ];

    public function lending()
    {
        return $this->belongsTo(Lending::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
