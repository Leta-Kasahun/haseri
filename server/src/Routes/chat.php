<?php
use Haseri\Backend\Modules\Chat\Controllers\ChatController;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($uri === '/api/chat/send' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new ChatController())->send($user);
        exit;
    }

    if (preg_match('/^\/api\/chat\/(\d+)\/(\d+)$/', $uri, $m) && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new ChatController())->messages($user, $m[1], $m[2]);
        exit;
    }

    if ($uri === '/api/chat/conversations' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new ChatController())->conversations($user);
        exit;
    }

    if (preg_match('/^\/api\/chat\/(\d+)\/read$/', $uri, $m) && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new ChatController())->markAsRead($user, $m[1]);
        exit;
    }

    if ($uri === '/api/chat/unread-count' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new ChatController())->unreadCount($user);
        exit;
    }
} catch (HttpException $e) {
    Response::error($e->getMessage(), $e->getStatusCode());
}