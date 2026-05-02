<?php
namespace Haseri\Backend\Modules\Chat\Services;

use Haseri\Backend\Shared\Models\Message;
use Pusher\Pusher;

class ChatService
{
    private $pusher;

    public function __construct()
    {
        $this->pusher = new Pusher(
            $_ENV['PUSHER_APP_KEY'],
            $_ENV['PUSHER_APP_SECRET'],
            $_ENV['PUSHER_APP_ID'],
            ['cluster' => $_ENV['PUSHER_APP_CLUSTER']]
        );
    }

    public function send($senderId, array $data)
    {
        $message = Message::create([
            'job_id' => $data['job_id'],
            'sender_id' => $senderId,
            'receiver_id' => $data['receiver_id'],
            'message' => $data['message'],
        ]);

        $this->pusher->trigger('chat.' . $data['receiver_id'], 'new-message', $message->load('sender'));

        return $message;
    }

    public function getMessages($userId, $jobId, $otherUserId)
    {
        return Message::where('job_id', $jobId)
            ->where(function ($q) use ($userId, $otherUserId) {
                $q->where('sender_id', $userId)->where('receiver_id', $otherUserId);
                $q->orWhere('sender_id', $otherUserId)->where('receiver_id', $userId);
            })
            ->orderBy('created_at')
            ->get();
    }

    public function conversations($userId)
    {
        return Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['job', 'sender', 'receiver'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('job_id');
    }

    public function markAsRead($userId, $jobId)
    {
        Message::where('receiver_id', $userId)
            ->where('job_id', $jobId)
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);
    }

    public function unreadCount($userId)
    {
        return Message::where('receiver_id', $userId)
            ->where('is_read', false)
            ->count();
    }
}