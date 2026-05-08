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
        // Generate Revenue History (Last 6 Months)
        $revenue_history = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = \Carbon\Carbon::now()->subMonths($i);
            $total = Payment::where('status', 'paid')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->sum('amount');
            $revenue_history[] = [
                'name' => $date->format('M'),
                'total' => (float) $total,
                'trend' => 0
            ];
        }

        // Generate User Activity (Last 7 Days)
        $user_activity = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = \Carbon\Carbon::now()->subDays($i);
            $new = User::whereDate('created_at', $date->toDateString())->count();
            $active = User::whereDate('updated_at', $date->toDateString())->count();
            $user_activity[] = [
                'name' => $date->format('D'),
                'new' => $new,
                'active' => $active
            ];
        }

        // Recent Payments
        $recent_payments = Payment::with('user')
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'payer_name' => $payment->user ? trim($payment->user->first_name . ' ' . $payment->user->last_name) : 'Unknown',
                    'created_at' => $payment->created_at->toIso8601String(),
                    'status' => $payment->status,
                    'amount' => (float) $payment->amount,
                    'currency' => 'ETB'
                ];
            });

        return [
            'total_users' => User::count(),
            'new_users_today' => User::whereDate('created_at', today())->count(),
            'total_jobs' => Job::count(),
            'jobs_today' => Job::whereDate('created_at', today())->count(),
            'revenue_today' => Payment::where('status', 'paid')->whereDate('created_at', today())->sum('amount'),
            'total_revenue' => Payment::where('status', 'paid')->sum('amount'),
            'pending_verifications' => \Haseri\Backend\Shared\Models\TechnicianVerification::where('status', 'pending')->count(),
            'revenue_history' => $revenue_history,
            'user_activity' => $user_activity,
            'recent_payments' => $recent_payments,
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