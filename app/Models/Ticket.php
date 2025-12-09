<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Ticket extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'visitor_name',
        'email',
        'phone',
        'visit_date',
        'quantity',
        'total_price',
        'payment_method',
        'status',
    ];

    protected $casts = [
        'visit_date' => 'date',
        'quantity' => 'integer',
        'total_price' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
