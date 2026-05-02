<?php
namespace Haseri\Backend\Shared\Models;
use Illuminate\Database\Eloquent\Model;
class TechnicianVerification extends Model
{
    protected $table = 'technician_verifications';
    protected $fillable = [
        'user_id',
        'address_id',
        'national_id_path',
        'proof_document_path',
        'proof_document_type',
        'status',
        'rejection_reason',
        'reviewed_by',
        'reviewed_at',
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(Admin::class, 'reviewed_by');
    }
}