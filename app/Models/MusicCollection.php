<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Facades\Storage;

/**
 * @mixin IdeHelperMusicCollection
 */
class MusicCollection extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'category',
        'origin',
        'description',
        'history',
        'image',
        'image_url',
        'year',
    ];

    protected $casts = [
        'year' => 'integer',
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

        return 'https://placehold.co/600x400/1e3a8a/ffffff/png?text=No+Image';
    }
}
