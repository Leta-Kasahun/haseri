<?php
namespace Haseri\Backend\Modules\Customer\Profile\Controllers;

use Haseri\Backend\Modules\Customer\Profile\Services\CustomerProfileService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class CustomerProfileController
{
    private $service;

    public function __construct()
    {
        $this->service = new CustomerProfileService();
    }

    public function show($user)
    {
        try {
            $result = $this->service->get($user->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function update($user)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->service->update($user->id, $data);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function updateAvatar($user)
    {
        try {
            $result = $this->service->updateAvatar($user->id, $_FILES['avatar']);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function updateCover($user)
    {
        try {
            $result = $this->service->updateCover($user->id, $_FILES['cover']);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function delete($user)
    {
        try {
            $result = $this->service->delete($user->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}