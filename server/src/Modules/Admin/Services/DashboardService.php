<?php
namespace Haseri\Backend\Modules\Admin\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\Job;
use Haseri\Backend\Shared\Models\Payment;
use Haseri\Backend\Shared\Models\TechnicianVerification;
use Haseri\Backend\Shared\Models\Review;

class DashboardService
{
    public function stats()
    {
        return [
            'users' => User::where('role', 'customer')->count(),
            'technicians' => User::where('role', 'provider')->count(),
            'pending_verifications' => TechnicianVerification::where('status', 'pending')->count(),
            'total_jobs' => Job::count(),
            'open_jobs' => Job::where('status', 'open')->count(),
            'completed_jobs' => Job::where('status', 'completed')->count(),
            'total_reviews' => Review::count(),
            'revenue' => Payment::where('status', 'paid')->sum('amount'),
        ];
    }

    public function recentJobs()
    {
        return Job::with(['customer', 'technician', 'category'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();
    }

    public function recentPayments()
    {
        return Payment::with('user')
            ->where('status', 'paid')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();
    }
}