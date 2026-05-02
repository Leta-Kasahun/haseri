<?php
namespace Haseri\Backend\Modules\Admin\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Exceptions\NotFoundException;

class UserManagementService
{
    public function all(array $filters = [])
    {
        $query = User::orderBy('created_at', 'desc');

        if (!empty($filters['role'])) {
            $query->where('role', $filters['role']);
        }

        if (!empty($filters['search'])) {
            $search = strtolower($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->whereRaw('LOWER(first_name) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(last_name) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(email) LIKE ?', ["%{$search}%"]);
            });
        }

        return $query->get();
    }

    public function find($id)
    {
        $user = User::with(['address', 'technicianVerification', 'customerVerification'])->find($id);
        if (!$user) throw new NotFoundException('User not found');
        return $user;
    }

    public function deactivate($id)
    {
        $user = User::find($id);
        if (!$user) throw new NotFoundException('User not found');
        $user->update(['is_active' => false]);
        return ['message' => 'User deactivated'];
    }

    public function activate($id)
    {
        $user = User::find($id);
        if (!$user) throw new NotFoundException('User not found');
        $user->update(['is_active' => true]);
        return ['message' => 'User activated'];
    }

    public function delete($id)
    {
        $user = User::find($id);
        if (!$user) throw new NotFoundException('User not found');
        $user->delete();
        return ['message' => 'User deleted'];
    }
}