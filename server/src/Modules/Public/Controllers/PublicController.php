<?php
namespace Haseri\Backend\Modules\Public\Controllers;

use Haseri\Backend\Modules\Public\Services\PublicService;
use Haseri\Backend\Shared\Helpers\Response;

class PublicController
{
    private $service;

    public function __construct()
    {
        $this->service = new PublicService();
    }

    public function topTechnicians()
    {
        $result = $this->service->topTechnicians();
        Response::success($result);
    }

    public function recentJobs()
    {
        $result = $this->service->recentJobs();
        Response::success($result);
    }

    public function highPriceJobs()
    {
        $result = $this->service->highPriceJobs();
        Response::success($result);
    }

    public function stats()
    {
        $result = $this->service->stats();
        Response::success($result);
    }
}