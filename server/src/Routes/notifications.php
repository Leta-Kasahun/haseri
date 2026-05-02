<?php
use Haseri\Backend\Modules\Notifications\Controllers\NotificationController;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($uri === '/api/notifications' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new NotificationController())->index($user);
        exit;
    }

    if ($uri === '/api/notifications/unread' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new NotificationController())->unread($user);
        exit;
    }

    if ($uri === '/api/notifications/count' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new NotificationController())->count($user);
        exit;
    }

    if (preg_match('/^\/api\/notifications\/(\d+)\/read$/', $uri, $m) && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new NotificationController())->markAsRead($user, $m[1]);
        exit;
    }

    if ($uri === '/api/notifications/read-all' && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new NotificationController())->markAllAsRead($user);
        exit;
    }

    if (preg_match('/^\/api\/notifications\/(\d+)$/', $uri, $m) && $method === 'DELETE') {
        $user = AuthMiddleware::handle();
        (new NotificationController())->destroy($user, $m[1]);
        exit;
    }
} catch (HttpException $e) {
    Response::error($e->getMessage(), $e->getStatusCode());
}