<?php
namespace Haseri\Backend\Modules\Auth\Controllers;

use Haseri\Backend\Modules\Auth\Services\RegisterService;
use Haseri\Backend\Modules\Auth\Requests\RegisterRequest;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;
#registration controller
class RegisterController
{
    public function register()
    {
        try {
            $request = new RegisterRequest();
            $data = $request->validate();

            $service = new RegisterService();
            $result = $service->register($data);

            Response::success($result, 201);
        } catch (\Throwable $e) {
            $message = $e->getMessage();
            $statusCode = $e instanceof HttpException ? $e->getStatusCode() : 500;
            
            // Sanitize database errors for users
            if (str_contains($message, 'Duplicate entry')) {
                $message = 'This email or phone number is already registered.';
                $statusCode = 409;
            } elseif ($statusCode === 500) {
                $message = 'An unexpected error occurred. Please try again later.';
            }

            Response::error(
                $message, 
                $statusCode,
                method_exists($e, 'getErrors') ? $e->getErrors() : null
            );
        }
    }
}