<?php
namespace Haseri\Backend\Shared\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerVerification extends Model
{
    protected $table = 'customer_verifications';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'status',
        'verified_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}