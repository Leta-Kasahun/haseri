<?php
namespace Haseri\Backend\Shared\Models;

use Illuminate\Database\Eloquent\Model;
use Haseri\Backend\Shared\Traits\Notifiable;
use Haseri\Backend\Shared\Traits\HasLocation;
class User extends Model
{
    use Notifiable, HasLocation;

    protected $table = 'users';

    protected $fillable = ['first_name','last_name', 'email',  'phone', 'password','google_id', 'avatar', 'cover_image', 'role',  'is_active',   'email_verified_at','phone_verified_at', 'last_login_at',
    ];
    protected $hidden = ['password'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function refreshTokens()
    {
        return $this->hasMany(RefreshToken::class, 'user_id');
    }

    public function customerVerification()
    {
        return $this->hasOne(CustomerVerification::class);
    }

    public function technicianVerification()
    {
        return $this->hasOne(TechnicianVerification::class);
    }
    public function skills()
{
    return $this->hasMany(TechnicianSkill::class);
}
}