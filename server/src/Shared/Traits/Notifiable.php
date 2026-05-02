<?php
namespace Haseri\Backend\Shared\Traits;

trait Notifiable
{
    public function notifications()
    {
        return $this->hasMany(\Haseri\Backend\Shared\Models\Notification::class, 'user_id');
    }

    public function unreadNotifications()
    {
        return $this->notifications()->where('is_read', false);
    }

    public function unreadCount()
    {
        return $this->unreadNotifications()->count();
    }

    public function markAsRead($id)
    {
        return $this->notifications()->where('id', $id)->update([
            'is_read' => true,
            'read_at' => now(),
        ]);
    }

    public function markAllAsRead()
    {
        return $this->unreadNotifications()->update([
            'is_read' => true,
            'read_at' => now(),
        ]);
    }
}