<?php
namespace Haseri\Backend\Shared\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $table = 'jobs';

    protected $fillable = [
        'customer_id',
        'technician_id',
        'category_id',
        'address_id',
        'accepted_application_id',
        'title',
        'description',
        'price',
        'commission',
        'status',
        'completed_at',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'commission' => 'decimal:2',
        'completed_at' => 'datetime',
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    public function category()
    {
        return $this->belongsTo(JobCategory::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }

    public function acceptedApplication()
    {
        return $this->belongsTo(JobApplication::class, 'accepted_application_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}