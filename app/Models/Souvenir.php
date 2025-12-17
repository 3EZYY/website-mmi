<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

/**
 * @mixin IdeHelperSouvenir
 */
class Souvenir extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
        'image_url',
        'category',
        'stock',
    ];

    protected $casts = [
        'price' => 'integer',
        'stock' => 'integer',
    ];

    protected $appends = ['thumbnail'];

    /**
     * Get the thumbnail URL.
     * Priority: uploaded image > external URL > placeholder
     */
    public function getThumbnailAttribute(): string
    {
        if ($this->image) {
            return Storage::url($this->image);
        }

        if ($this->image_url) {
            return $this->image_url;
        }

        return 'https://placehold.co/400x400/6366f1/ffffff/png?text=No+Image';
    }
}
