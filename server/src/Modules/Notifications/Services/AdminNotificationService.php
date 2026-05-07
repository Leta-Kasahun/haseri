<?php
namespace Haseri\Backend\Modules\Notifications\Services;

use Haseri\Backend\Shared\Models\AdminNotification;
use Haseri\Backend\Shared\Exceptions\NotFoundException;

class AdminNotificationService
{
    public function getAll($adminId)
    {
        return AdminNotification::where('admin_id', $adminId)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();
    }

    public function unread($adminId)
    {
        return AdminNotification::where('admin_id', $adminId)
            ->where('is_read', false)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function count($adminId)
    {
        return AdminNotification::where('admin_id', $adminId)
            ->where('is_read', false)
            ->count();
    }

    public function markAsRead($adminId, $id)
    {
        $updated = AdminNotification::where('id', $id)
            ->where('admin_id', $adminId)
            ->update([
                'is_read' => true,
                'read_at' => date('Y-m-d H:i:s'),
            ]);

        if (!$updated) {
            throw new NotFoundException('Notification not found');
        }

        return ['message' => 'Marked as read'];
    }

    public function markAllAsRead($adminId)
    {
        AdminNotification::where('admin_id', $adminId)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => date('Y-m-d H:i:s'),
            ]);

        return ['message' => 'All marked as read'];
    }

    public function delete($adminId, $id)
    {
        $notification = AdminNotification::where('id', $id)
            ->where('admin_id', $adminId)
            ->first();

        if (!$notification) {
            throw new NotFoundException('Notification not found');
        }

        $notification->delete();
        return ['message' => 'Deleted'];
    }
}
