<?php
namespace Haseri\Backend\Modules\Notifications\Services;

use Haseri\Backend\Shared\Models\Admin;
use Haseri\Backend\Shared\Models\AdminNotification;

class AdminNotifier
{
    public static function notifyAll(
        string $title,
        string $message,
        string $type = 'system',
        ?int $referenceId = null
    ): void {
        $admins = Admin::where('is_active', true)->get();

        foreach ($admins as $admin) {
            AdminNotification::create([
                'admin_id' => $admin->id,
                'title' => $title,
                'message' => $message,
                'type' => $type,
                'reference_id' => $referenceId,
            ]);
        }
    }
}
