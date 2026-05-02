<?php
namespace Haseri\Backend\Modules\Chat\Controllers;

use Haseri\Backend\Modules\Chat\Services\ChatService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class ChatController
{
    private $service;

    public function __construct()
    {
        $this->service = new ChatService();
    }

    public function send($user)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->service->send($user->id, $data);
            Response::success($result, 201);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function messages($user, $jobId, $otherUserId)
    {
        $result = $this->service->getMessages($user->id, $jobId, $otherUserId);
        Response::success($result);
    }

    public function conversations($user)
    {
        $result = $this->service->conversations($user->id);
        Response::success($result);
    }

    public function markAsRead($user, $jobId)
    {
        $this->service->markAsRead($user->id, $jobId);
        Response::success(['message' => 'Marked as read']);
    }

    public function unreadCount($user)
    {
        $result = $this->service->unreadCount($user->id);
        Response::success(['count' => $result]);
    }
}