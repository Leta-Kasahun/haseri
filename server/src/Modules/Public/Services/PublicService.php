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
            ->with(['skills', 'address', 'technicianVerification'])
            ->orderByRaw('(SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE reviewed_user_id = users.id) DESC')
            ->get()
            ->map(function ($tech) {
                return [
                    'id' => $tech->id,
                    'name' => $tech->first_name . ' ' . $tech->last_name,
                    'avatar' => $tech->avatar,
                    'rating' => $tech->average_rating,
                    'total_reviews' => $tech->review_count,
                    'city' => $tech->address ? $tech->address->city : null,
                    'specific_location' => $tech->address ? $tech->address->specific_location : null,
                    'skills' => $tech->skills->pluck('skill_name')->take(2),
                    'verified' => $tech->technicianVerification && $tech->technicianVerification->status === 'approved',
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