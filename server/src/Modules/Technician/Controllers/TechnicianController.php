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
}