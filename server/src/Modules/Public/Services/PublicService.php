<?php
namespace Haseri\Backend\Modules\Public\Services;

use Haseri\Backend\Modules\Public\Repositories\PublicRepository;
use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Services\TrustScoreService;

class PublicService
{
    private $repository;

    public function __construct()
    {
        $this->repository = new PublicRepository();
    }

    public function topTechnicians()
    {
        return $this->repository->getTopTechnicians();
    }

    public function technicians($skill = null)
    {
        return $this->repository->getTechnicians($skill);
    }

    public function recentJobs()
    {
        return $this->repository->getRecentJobs();
    }

    public function highPriceJobs()
    {
        return $this->repository->getHighPriceJobs();
    }

    public function stats()
    {
        return $this->repository->getStats();
    }

    public function searchSuggestions($query)
    {
        return $this->repository->getSearchSuggestions($query);
    }

    public function skills()
    {
        return $this->repository->getPublicSkills();
    }

    public function technicianProfile($id)
    {
        $tech = User::with(['skills', 'address', 'technicianVerification'])
            ->where('role', 'provider')
            ->where('is_active', true)
            ->find($id);

        if (!$tech) {
            return null;
        }

        $trustService = new TrustScoreService();
        $trust = $trustService->calculate($id);

        $tech->average_rating = $trust['trust_score'];
        $tech->review_count = $trust['total_reviews'];
        $tech->completed_jobs_count = $trust['completed_jobs'];

        return $tech;
    }
}