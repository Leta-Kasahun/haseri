<?php
namespace Haseri\Backend\Shared\Models;
use Illuminate\Database\Eloquent\Model;
class JobApplication extends Model
{
    protected $table = 'job_applications';

    protected $fillable = [
        'job_id',
        'provider_id',
        'message',
        'proposed_price',
        'status',
    ];

    protected $casts = [
        'proposed_price' => 'decimal:2',
    ];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function provider()
    {
        return $this->belongsTo(User::class, 'provider_id');
    }
}