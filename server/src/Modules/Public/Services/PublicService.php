<?php
namespace Haseri\Backend\Modules\Public\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\Job;
use Haseri\Backend\Shared\Models\Review;

class PublicService
{
    public function topTechnicians()
    {
        return User::where('role', 'provider')
            ->where('is_active', true)
            ->whereHas('technicianVerification', function ($q) {
                $q->where('status', 'approved');
            })
            ->withCount(['reviews as rating_avg' => function ($q) {
                $q->select(\DB::raw('COALESCE(AVG(rating), 0)'));
            }])
            ->withCount(['reviews as total_reviews'])
            ->withCount(['technicianJobs as completed_jobs' => function ($q) {
                $q->where('status', 'completed');
            }])
            ->orderByDesc('rating_avg')
            ->limit(10)
            ->get()
            ->map(function ($tech) {
                return [
                    'id' => $tech->id,
                    'name' => $tech->first_name . ' ' . $tech->last_name,
                    'avatar' => $tech->avatar,
                    'rating' => round($tech->rating_avg, 1),
                    'total_reviews' => $tech->total_reviews,
                    'completed_jobs' => $tech->completed_jobs,
                    'city' => $tech->address ? $tech->address->city : null,
                ];
            });
    }

    public function recentJobs()
    {
        return Job::with(['category', 'address'])
            ->where('status', 'open')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'price' => $job->price,
                    'category' => $job->category ? $job->category->name : null,
                    'city' => $job->address ? $job->address->city : null,
                    'specific_location' => $job->address ? $job->address->specific_location : null,
                    'created_at' => $job->created_at->toIso8601String(),
                ];
            });
    }

    public function highPriceJobs()
    {
        return Job::with(['category', 'address'])
            ->where('status', 'open')
            ->orderBy('price', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'price' => $job->price,
                    'category' => $job->category ? $job->category->name : null,
                    'city' => $job->address ? $job->address->city : null,
                    'specific_location' => $job->address ? $job->address->specific_location : null,
                    'created_at' => $job->created_at->toIso8601String(),
                ];
            });
    }

    public function stats()
    {
        return [
            'technicians' => User::where('role', 'provider')->where('is_active', true)->count(),
            'jobs_posted' => Job::count(),
            'jobs_completed' => Job::where('status', 'completed')->count(),
            'reviews' => Review::count(),
        ];
    }
}