<?php
namespace Haseri\Backend\Shared\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\Job;
use Haseri\Backend\Shared\Models\Payment;
use Haseri\Backend\Shared\Models\Review;

class AnalyticsService
{
    private function syncMissingPayments()
    {
        // 1. Sync missing job payments (anything beyond the first 3 jobs)
        $users = \Haseri\Backend\Shared\Models\User::where('role', 'customer')->get();
        foreach ($users as $user) {
            $jobs = \Haseri\Backend\Shared\Models\Job::where('customer_id', $user->id)
                ->whereIn('status', ['open', 'assigned', 'completed'])
                ->orderBy('created_at', 'asc')
                ->get();
            
            if ($jobs->count() > 3) {
                $paidJobs = $jobs->slice(3);
                foreach ($paidJobs as $job) {
                    $exists = Payment::where('payment_type', 'job_posting')
                        ->where('related_id', $job->id)
                        ->exists();
                    
                    if (!$exists) {
                        Payment::create([
                            'user_id' => $user->id,
                            'payment_type' => 'job_posting',
                            'related_id' => $job->id,
                            'amount' => 50,
                            'status' => 'paid',
                            'created_at' => $job->created_at
                        ]);
                    }
                }
            }

            // 2. Sync missing verification payments
            $isVerified = \Haseri\Backend\Shared\Models\CustomerVerification::where('user_id', $user->id)
                ->where('status', 'verified')
                ->first();
            
            if ($isVerified) {
                $exists = Payment::where('user_id', $user->id)
                    ->where('payment_type', 'customer_verification')
                    ->exists();
                
                if (!$exists) {
                    Payment::create([
                        'user_id' => $user->id,
                        'payment_type' => 'customer_verification',
                        'related_id' => $isVerified->id,
                        'amount' => 50,
                        'status' => 'paid',
                        'created_at' => $isVerified->verified_at ?? $user->created_at
                    ]);
                }
            }
        }
    }

    public function userStats($userId)
    {
        /*
        try {
            if ($userId > 0) $this->syncMissingPayments();
        } catch (\Exception $e) {
            // Log or ignore sync errors to prevent dashboard crash
        }
        */
        
        return [
            'jobs_posted' => Job::where('customer_id', $userId)->count(),
            'jobs_completed' => Job::where('customer_id', $userId)->where('status', 'completed')->count(),
            'total_spent' => (float) Payment::where('user_id', $userId)->where('status', 'paid')->sum('amount'),
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
            'total_earned' => (float) Job::where('technician_id', $userId)->where('status', 'completed')->sum('price'),
            'rating' => round(Review::where('reviewed_user_id', $userId)->avg('rating') ?? 0, 1),
        ];
    }

    public function adminStats()
    {
        /*
        try {
            $this->syncMissingPayments();
        } catch (\Exception $e) {
            // Ignore sync errors
        }
        */

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
                    'created_at' => $payment->created_at ? $payment->created_at->toIso8601String() : \Carbon\Carbon::now()->toIso8601String(),
                    'status' => $payment->status,
                    'amount' => (float) $payment->amount,
                    'currency' => 'ETB'
                ];
            });

        return [
            'total_users' => User::count(),
            'new_users_today' => User::whereDate('created_at', \Carbon\Carbon::today())->count(),
            'total_jobs' => Job::count(),
            'jobs_today' => Job::whereDate('created_at', \Carbon\Carbon::today())->count(),
            'revenue_today' => (float) Payment::where('status', 'paid')->whereDate('created_at', \Carbon\Carbon::today())->sum('amount'),
            'total_revenue' => (float) Payment::where('status', 'paid')->sum('amount'),
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