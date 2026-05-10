<?php
namespace Haseri\Backend\Modules\Public\Controllers;

use Haseri\Backend\Modules\Public\Services\PublicService;
use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Services\TrustScoreService;
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

    public function technicianProfile($id)
    {
        $tech = User::with(['skills', 'address', 'technicianVerification'])
            ->where('role', 'provider')
            ->where('is_active', true)
            ->find($id);

        if (!$tech) {
            return Response::json(['success' => false, 'error' => 'Technician not found'], 404);
        }

        $trustService = new TrustScoreService();
        $trust = $trustService->calculate($id);

        // Append trust data to tech object for frontend compatibility
        $tech->average_rating = $trust['trust_score'];
        $tech->review_count = $trust['total_reviews'];
        $tech->completed_jobs_count = $trust['completed_jobs'];

        Response::success($tech);
    }
    public function searchSuggestions()
    {
        $query = $_GET['q'] ?? '';
        $result = $this->service->searchSuggestions($query);
        Response::success($result);
    }
}