<?php
namespace Haseri\Backend\Shared\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\Job;
use Haseri\Backend\Shared\Models\Payment;
use Haseri\Backend\Shared\Models\Review;

class AnalyticsService
{
    public function userStats($userId)
    {
        return [
            'jobs_posted' => Job::where('customer_id', $userId)->count(),
            'jobs_completed' => Job::where('customer_id', $userId)->where('status', 'completed')->count(),
            'total_spent' => Payment::where('user_id', $userId)->where('status', 'paid')->sum('amount'),
            'reviews_given' => Review::where('reviewer_id', $userId)->count(),
            'reviews_received' => Review::where('reviewed_user_id', $userId)->count(),
        ];
    }

    public function technicianStats($userId)
    {
        return [
            'jobs_assigned' => Job::where('technician_id', $userId)->count(),
            'jobs_completed' => Job::where('technician_id', $userId)->where('status', 'completed')->count(),
            'completion_rate' => $this->completionRate($userId),
            'total_earned' => Job::where('technician_id', $userId)->where('status', 'completed')->sum('price'),
            'rating' => round(Review::where('reviewed_user_id', $userId)->avg('rating') ?? 0, 1),
        ];
    }

    public function adminStats()
    {
        return [
            'total_users' => User::count(),
            'new_users_today' => User::whereDate('created_at', today())->count(),
            'total_jobs' => Job::count(),
            'jobs_today' => Job::whereDate('created_at', today())->count(),
            'revenue_today' => Payment::where('status', 'paid')->whereDate('created_at', today())->sum('amount'),
            'total_revenue' => Payment::where('status', 'paid')->sum('amount'),
            'pending_verifications' => \Haseri\Backend\Shared\Models\TechnicianVerification::where('status', 'pending')->count(),
        ];
    }

    private function completionRate($userId)
    {
        $total = Job::where('technician_id', $userId)->count();
        if ($total === 0) return 0;
        $completed = Job::where('technician_id', $userId)->where('status', 'completed')->count();
        return round(($completed / $total) * 100, 1);
    }
}