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
            return Response::success(null);
        }

        $trustService = new TrustScoreService();
        $trust = $trustService->calculate($id);

        Response::success([
            'id' => $tech->id,
            'name' => $tech->first_name . ' ' . $tech->last_name,
            'avatar' => $tech->avatar,
            'cover' => $tech->cover_image,
            'skills' => $tech->skills->pluck('skill_name'),
            'rating' => $trust['trust_score'],
            'total_reviews' => $trust['total_reviews'],
            'completed_jobs' => $trust['completed_jobs'],
            'city' => $tech->address ? $tech->address->city : null,
            'verified' => $tech->technicianVerification && $tech->technicianVerification->status === 'approved',
        ]);
    }
}