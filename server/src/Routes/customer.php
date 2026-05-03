<?php
use Haseri\Backend\Modules\Customer\Verification\Controllers\CustomerVerificationController;
use Haseri\Backend\Modules\Customer\Profile\Controllers\CustomerProfileController;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    // Verification
    if ($uri === '/api/customer/verify' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new CustomerVerificationController())->initiate($user);
        exit;
    }

    if ($uri === '/api/customer/verify/confirm' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new CustomerVerificationController())->confirm($user);
        exit;
    }

    if ($uri === '/api/customer/verification-status' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new CustomerVerificationController())->status($user);
        exit;
    }

    // Profile
    if ($uri === '/api/customer/profile' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new CustomerProfileController())->show($user);
        exit;
    }

    if ($uri === '/api/customer/profile' && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new CustomerProfileController())->update($user);
        exit;
    }

    if ($uri === '/api/customer/profile' && $method === 'DELETE') {
        $user = AuthMiddleware::handle();
        (new CustomerProfileController())->delete($user);
        exit;
    }

    // Avatar
    if ($uri === '/api/customer/avatar' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new CustomerProfileController())->updateAvatar($user);
        exit;
    }

    if ($uri === '/api/customer/cover' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new CustomerProfileController())->updateCover($user);
        exit;
    }
} catch (HttpException $e) {
    Response::error($e->getMessage(), $e->getStatusCode());
}