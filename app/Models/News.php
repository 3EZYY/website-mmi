<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @mixin IdeHelperNews
 */
class News extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'image_url',
        'category',
        'author',
        'published_at',
        'is_published',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
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

        return 'https://placehold.co/800x450/1e3a8a/ffffff/png?text=No+Image';
    }
}
