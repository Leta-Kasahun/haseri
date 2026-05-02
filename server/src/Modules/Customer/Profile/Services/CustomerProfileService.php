<?php
namespace Haseri\Backend\Modules\Customer\Profile\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\Address;
use Haseri\Backend\Shared\Exceptions\NotFoundException;

class CustomerProfileService
{
    public function get($userId)
    {
        $user = User::with('address')->find($userId);
        if (!$user) throw new NotFoundException('User not found');
        return $user;
    }

    public function update($userId, array $data)
    {
        $user = User::find($userId);
        if (!$user) throw new NotFoundException('User not found');

        $user->update([
            'first_name' => $data['first_name'] ?? $user->first_name,
            'last_name' => $data['last_name'] ?? $user->last_name,
            'phone' => $data['phone'] ?? $user->phone,
            'avatar' => $data['avatar'] ?? $user->avatar,
        ]);

        if (!empty($data['city'])) {
            Address::updateOrCreate(
                ['user_id' => $userId, 'is_primary' => true],
                [
                    'city' => $data['city'],
                    'sub_city' => $data['sub_city'] ?? null,
                    'woreda' => $data['woreda'] ?? null,
                    'kebele' => $data['kebele'] ?? null,
                    'specific_location' => $data['specific_location'] ?? null,
                ]
            );
        }

        return User::with('address')->find($userId);
    }

    public function delete($userId)
    {
        $user = User::find($userId);
        if (!$user) throw new NotFoundException('User not found');
        $user->update(['is_active' => false]);
        return ['message' => 'Account deactivated'];
    }
}