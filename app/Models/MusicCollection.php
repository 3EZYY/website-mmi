<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class MusicCollection extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'category',
        'origin',
        'description',
        'history',
        'image_url',
        'year',
    ];

    protected $casts = [
        'year' => 'integer',
    ];
}
