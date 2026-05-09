<?php
namespace Haseri\Backend\Modules\Reviews\Services;

use Haseri\Backend\Shared\Models\Review;
use Haseri\Backend\Shared\Models\Job;
use Haseri\Backend\Shared\Models\Notification;
use Haseri\Backend\Shared\Exceptions\NotFoundException;
use Haseri\Backend\Shared\Exceptions\ConflictException;
use Haseri\Backend\Shared\Exceptions\UnauthorizedException;

class ReviewService
{
    public function create($reviewerId, array $data)
    {
        $job = Job::find($data['job_id']);
        if (!$job) throw new NotFoundException('Job not found');
        if ($job->status !== 'completed') throw new ConflictException('Only completed jobs can be reviewed');

        $reviewer = \Haseri\Backend\Shared\Models\User::find($reviewerId);
        $reviewed = \Haseri\Backend\Shared\Models\User::find($data['reviewed_user_id']);
        if (!$reviewed) throw new NotFoundException('User not found');

        // Customer can only review technician if verified or has paid
        if ($reviewerId == $job->customer_id) {
            if ($data['reviewed_user_id'] != $job->technician_id) {
                throw new ConflictException('Customer can only review technician');
            }

            // Check verification or payment
            $isVerified = \Haseri\Backend\Shared\Models\CustomerVerification::where('user_id', $reviewerId)
                ->where('status', 'verified')
                ->exists();
            
            $hasPaid = \Haseri\Backend\Shared\Models\Payment::where('user_id', $reviewerId)
                ->whereIn('status', ['success', 'paid'])
                ->exists();

            if (!$isVerified && !$hasPaid) {
                throw new ConflictException('You must be verified or have a successful payment to leave a review');
            }
        }

        // Technician can only review customer
        if ($reviewerId == $job->technician_id && $data['reviewed_user_id'] != $job->customer_id) {
            throw new ConflictException('Technician can only review customer');
        }

        // Cannot review same role
        if ($reviewer->role === $reviewed->role) {
            throw new ConflictException('Cannot review a ' . $reviewer->role);
        }

        // Cannot review self
        if ($reviewerId == $data['reviewed_user_id']) {
            throw new ConflictException('Cannot review yourself');
        }

        // Check if already reviewed
        $exists = Review::where('job_id', $data['job_id'])
            ->where('reviewer_id', $reviewerId)
            ->where('reviewed_user_id', $data['reviewed_user_id'])
            ->exists();
        if ($exists) throw new ConflictException('Already reviewed');

        $review = Review::create([
            'job_id' => $data['job_id'],
            'reviewer_id' => $reviewerId,
            'reviewed_user_id' => $data['reviewed_user_id'],
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
        ]);

        Notification::create([
            'user_id' => $data['reviewed_user_id'],
            'title' => 'New Review Received',
            'message' => 'You received a ' . $data['rating'] . '-star review',
            'type' => 'review_received',
            'reference_id' => $review->id,
        ]);

        return $review;
    }

    public function getByUser($userId)
    {
        return Review::with(['reviewer', 'job'])
            ->where('reviewed_user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getByJob($jobId)
    {
        return Review::with(['reviewer', 'reviewedUser'])
            ->where('job_id', $jobId)
            ->get();
    }
}