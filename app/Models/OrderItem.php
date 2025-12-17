<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

/**
 * @mixin IdeHelperOrderItem
 */
class OrderItem extends Model
{
    use HasUuids;

    protected $fillable = [
        'order_id',
        'souvenir_id',
        'quantity',
        'price',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'integer',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function souvenirs()
    {
        return $this->belongsTo(Souvenir::class, 'souvenir_id');
    }
}
