<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
// Import the HasFactory trait
use Illuminate\Database\Eloquent\Factories\HasFactory; 

class Souvenir extends Model
{
    // Use the HasFactory trait
    use HasFactory, HasUuids; 

    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',
        'category',
        'stock',
    ];

    protected $casts = [
        'price' => 'integer',
        'stock' => 'integer',
    ];
}
