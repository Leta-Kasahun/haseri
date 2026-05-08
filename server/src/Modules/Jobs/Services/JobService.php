<?php
namespace Haseri\Backend\Modules\Jobs\Services;

use Haseri\Backend\Modules\Jobs\Repositories\JobRepository;
use Haseri\Backend\Shared\Models\Job;
use Haseri\Backend\Shared\Models\Address;
use Haseri\Backend\Shared\Models\Notification;
use Haseri\Backend\Shared\Enums\NotificationType;
use Haseri\Backend\Modules\Notifications\Services\AdminNotifier;
use Haseri\Backend\Modules\Payments\Services\PaymentService;
use Haseri\Backend\Shared\Exceptions\NotFoundException;

class JobService
{
    private $repository;
    private $paymentService;

    public function __construct()
    {
        $this->repository = new JobRepository();
        $this->paymentService = new PaymentService();
    }

    public function create($userId, array $data)
    {
        if (!empty($data['city'])) {
            $address = Address::updateOrCreate(
                ['user_id' => $userId, 'is_primary' => true],
                [
                    'city' => $data['city'],
                    'sub_city' => $data['sub_city'] ?? null,
                    'woreda' => $data['woreda'] ?? null,
                    'kebele' => $data['kebele'] ?? null,
                    'specific_location' => $data['specific_location'] ?? null,
                ]
            );
            $addressId = $address->id;
        } else {
            $primary = Address::where('user_id', $userId)->where('is_primary', true)->first();
            $addressId = $primary ? $primary->id : null;
        }

        $job = Job::create([
            'customer_id' => $userId,
            'category_id' => $data['category_id'],
            'address_id' => $addressId,
            'title' => $data['title'],
            'description' => $data['description'] ?? '',
            'price' => $data['price'],
            'commission' => $data['price'] * 0.15,
            'status' => 'open',
        ]);

        AdminNotifier::notifyAll(
            'New Job Posted',
            'A new job "' . $job->title . '" has been posted.',
            'job_posted',
            $job->id
        );

        return $job;
    }

    public function getAll(array $filters = [])
    {
        return $this->repository->filter($filters);
    }

    public function getById($id)
    {
        $job = $this->repository->findById($id);
        if (!$job) throw new NotFoundException('Job not found');
        return $job;
    }

    public function getByCustomer($userId)
    {
        return $this->repository->findByCustomer($userId);
    }

    public function getByTechnician($userId)
    {
        return $this->repository->findByTechnician($userId);
    }

    public function complete($jobId)
    {
        $job = Job::find($jobId);
        if (!$job) throw new NotFoundException('Job not found');
        $job->update(['status' => 'completed', 'completed_at' => now()]);

        Notification::create([
            'user_id' => $job->customer_id,
            'title' => 'Job Completed',
            'message' => 'Your job "' . $job->title . '" has been marked as completed.',
            'type' => NotificationType::JOB_COMPLETED,
            'reference_id' => $job->id,
        ]);

        if (!empty($job->technician_id)) {
            Notification::create([
                'user_id' => $job->technician_id,
                'title' => 'Job Completed',
                'message' => 'Job "' . $job->title . '" has been completed.',
                'type' => NotificationType::JOB_COMPLETED,
                'reference_id' => $job->id,
            ]);
        }

        AdminNotifier::notifyAll(
            'Job Completed',
            'Job "' . $job->title . '" has been completed.',
            'job_completed',
            $job->id
        );

        return $job;
    }

    public function cancel($jobId)
    {
        $job = Job::find($jobId);
        if (!$job) throw new NotFoundException('Job not found');
        $job->update(['status' => 'cancelled']);

        Notification::create([
            'user_id' => $job->customer_id,
            'title' => 'Job Cancelled',
            'message' => 'Your job "' . $job->title . '" was cancelled.',
            'type' => NotificationType::SYSTEM,
            'reference_id' => $job->id,
        ]);

        if (!empty($job->technician_id)) {
            Notification::create([
                'user_id' => $job->technician_id,
                'title' => 'Job Cancelled',
                'message' => 'Job "' . $job->title . '" was cancelled.',
                'type' => NotificationType::SYSTEM,
                'reference_id' => $job->id,
            ]);
        }

        AdminNotifier::notifyAll(
            'Job Cancelled',
            'Job "' . $job->title . '" has been cancelled.',
            'job_cancelled',
            $job->id
        );

        return $job;
    }

    public function delete($jobId)
    {
        $job = Job::find($jobId);
        if (!$job) throw new NotFoundException('Job not found');
        return $job->delete();
    }

    public function deleteByUser($userId, $jobId)
    {
        $job = Job::where('id', $jobId)->where('customer_id', $userId)->first();
        if (!$job) throw new NotFoundException('Job not found or unauthorized');
        return $job->delete();
    }

    public function update($userId, $jobId, array $data)
    {
        $job = Job::where('id', $jobId)->where('customer_id', $userId)->first();
        if (!$job) throw new NotFoundException('Job not found or unauthorized');

        $updateData = [];
        if (isset($data['title'])) $updateData['title'] = $data['title'];
        if (isset($data['description'])) $updateData['description'] = $data['description'];
        if (isset($data['price'])) {
            $updateData['price'] = $data['price'];
            $updateData['commission'] = $data['price'] * 0.15;
        }
        if (isset($data['category_id'])) $updateData['category_id'] = $data['category_id'];

        $job->update($updateData);
        return $job;
    }
}