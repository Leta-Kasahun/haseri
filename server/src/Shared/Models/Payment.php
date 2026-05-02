<?php
namespace Haseri\Backend\Shared\Models;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'payment_type',
        'related_id',
        'amount',
        'chapa_tx_ref',
        'chapa_transaction_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}