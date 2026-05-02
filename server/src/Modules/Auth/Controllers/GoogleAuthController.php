<?php
namespace Haseri\Backend\Modules\Auth\Controllers;
use Haseri\Backend\Modules\Auth\Services\LoginService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;
class GoogleAuthController
{
    public function callback()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $service = new LoginService();
            $result = $service->loginWithGoogle($data);
            Response::success($result);
        } catch (\Throwable $e) {
            $message = $e->getMessage();
            $statusCode = $e instanceof HttpException ? $e->getStatusCode() : 500;
            if ($statusCode === 500) {
                $message = 'An unexpected error occurred during Google authentication.';
            }
            Response::error($message, $statusCode);
        }
    }

    public function setRole()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $service = new LoginService();
            $result = $service->setRoleAfterGoogle($data['user_id'], $data['role']);
            Response::success($result);
        } catch (\Throwable $e) {
            $message = $e->getMessage();
            $statusCode = $e instanceof HttpException ? $e->getStatusCode() : 500;
            if ($statusCode === 500) {
                $message = 'An unexpected error occurred while setting your role.';
            }
            Response::error($message, $statusCode);
        }
    }
}