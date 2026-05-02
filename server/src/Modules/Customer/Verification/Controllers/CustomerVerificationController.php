<?php
namespace Haseri\Backend\Modules\Customer\Verification\Controllers;

use Haseri\Backend\Modules\Customer\Verification\Services\CustomerVerificationService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class CustomerVerificationController
{
    private $service;

    public function __construct()
    {
        $this->service = new CustomerVerificationService();
    }

    public function initiate($user)
    {
        try {
            $result = $this->service->initiate($user->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function confirm($user)
    {
        try {
            $result = $this->service->confirm($user->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function status($user)
    {
        try {
            $result = $this->service->status($user->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}