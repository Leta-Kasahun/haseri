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

    public function technicians()
    {
        $skill = $_GET['skill'] ?? null;
        $result = $this->service->technicians($skill);
        Response::success($result);
    }

    public function skills()
    {
        $result = $this->service->skills();
        Response::success($result);
    }

    public function technicianProfile($id)
    {
        $tech = $this->service->technicianProfile($id);

        if (!$tech) {
            return Response::json(['success' => false, 'error' => 'Technician not found'], 404);
        }

        Response::success($tech);
    }
    public function searchSuggestions()
    {
        $query = $_GET['q'] ?? '';
        $result = $this->service->searchSuggestions($query);
        Response::success($result);
    }
}