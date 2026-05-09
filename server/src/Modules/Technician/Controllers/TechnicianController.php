<?php
namespace Haseri\Backend\Modules\Technician\Controllers;

use Haseri\Backend\Modules\Technician\Services\TechnicianService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class TechnicianController
{
    private $service;

    public function __construct()
    {
        $this->service = new TechnicianService();
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

    public function updateSkills($user)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->service->updateSkills($user->id, $data['skills'] ?? []);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function getSkills($user)
    {
        $result = $this->service->getSkills($user->id);
        Response::success($result);
    }

    public function stats($user)
    {
        try {
            $result = $this->service->getStats($user->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}