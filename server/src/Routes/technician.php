<?php
use Haseri\Backend\Modules\Technician\Controllers\TechnicianVerificationController;
use Haseri\Backend\Modules\Technician\Controllers\TechnicianController;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    // Verification
    if ($uri === '/api/technician/verify' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new TechnicianVerificationController())->submit($user);
        exit;
    }

    if ($uri === '/api/technician/verification-status' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new TechnicianVerificationController())->status($user);
        exit;
    }

    // Profile
    if ($uri === '/api/technician/profile' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new TechnicianController())->show($user);
        exit;
    }

    if ($uri === '/api/technician/profile' && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new TechnicianController())->update($user);
        exit;
    }

    // Avatar
    if ($uri === '/api/technician/avatar' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new TechnicianController())->updateAvatar($user);
        exit;
    }

    // Cover
    if ($uri === '/api/technician/cover' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new TechnicianController())->updateCover($user);
        exit;
    }

    // Skills
    if ($uri === '/api/technician/skills' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new TechnicianController())->getSkills($user);
        exit;
    }

    if ($uri === '/api/technician/skills' && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new TechnicianController())->updateSkills($user);
        exit;
    }
} catch (HttpException $e) {
    Response::error($e->getMessage(), $e->getStatusCode());
}