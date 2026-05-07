<?php
namespace Haseri\Backend\Modules\Notifications\Controllers;

use Haseri\Backend\Modules\Notifications\Services\AdminNotificationService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class AdminNotificationController
{
    private $service;

    public function __construct()
    {
        $this->service = new AdminNotificationService();
    }

    public function index($admin)
    {
        $result = $this->service->getAll($admin->id);
        Response::success($result);
    }

    public function unread($admin)
    {
        $result = $this->service->unread($admin->id);
        Response::success($result);
    }

    public function count($admin)
    {
        $result = $this->service->count($admin->id);
        Response::success(['count' => $result]);
    }

    public function markAsRead($admin, $id)
    {
        try {
            $result = $this->service->markAsRead($admin->id, $id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function markAllAsRead($admin)
    {
        $result = $this->service->markAllAsRead($admin->id);
        Response::success($result);
    }

    public function destroy($admin, $id)
    {
        try {
            $result = $this->service->delete($admin->id, $id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}
