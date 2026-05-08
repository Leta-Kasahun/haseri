<?php
namespace Haseri\Backend\Modules\Admin\Controllers;

use Haseri\Backend\Modules\Admin\Services\DashboardService;
use Haseri\Backend\Shared\Helpers\Response;

class DashboardController
{
    private $service;

    public function __construct()
    {
        $this->service = new DashboardService();
    }

    public function stats($admin)
    {
        $result = $this->service->stats();
        Response::success($result);
    }

    public function recentJobs($admin)
    {
        $result = $this->service->recentJobs();
        Response::success($result);
    }

    public function allJobs($admin)
    {
        $result = $this->service->allJobs();
        Response::success($result);
    }

    public function recentPayments($admin)
    {
        $result = $this->service->recentPayments();
        Response::success($result);
    }
}