<?php
namespace Haseri\Backend\Shared\Services;

use Haseri\Backend\Shared\Models\Review;
use Haseri\Backend\Shared\Models\Job;

class TrustScoreService
{
    public function calculate($userId)
    {
        $averageRating = Review::where('reviewed_user_id', $userId)->avg('rating') ?? 0;

        $totalReviews = Review::where('reviewed_user_id', $userId)->count();

        $completedJobs = Job::where(function ($query) use ($userId) {
            $query->where('technician_id', $userId)
                  ->orWhere('customer_id', $userId);
        })->where('status', 'completed')->count();

        return [
            'trust_score' => round($averageRating, 1),
            'total_reviews' => $totalReviews,
            'completed_jobs' => $completedJobs,
        ];
    }
}