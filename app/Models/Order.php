<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Order extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'total_amount',
        'phone',
        'shipping_address',
        'status',
        'payment_status',
        'payment_method',
    ];

    protected $casts = [
        'total_amount' => 'integer',
    ];

    /**
     * Append order_items to JSON for frontend compatibility
     */
    protected $appends = ['order_items'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Accessor to provide order_items in snake_case for frontend
     */
    public function getOrderItemsAttribute()
    {
        return $this->getRelationValue('orderItems');
    }
}
