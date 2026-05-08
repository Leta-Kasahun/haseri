<?php
namespace Haseri\Backend\Modules\Jobs\Controllers;

use Haseri\Backend\Modules\Jobs\Services\JobApplicationService;
use Haseri\Backend\Modules\Jobs\Requests\ApplicationRequest;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class JobApplicationController
{
    private $service;

    public function __construct()
    {
        $this->service = new JobApplicationService();
    }

    public function apply($user, $jobId)
    {
        try {
            $request = new ApplicationRequest();
            $data = $request->validate();
            $result = $this->service->apply($user->id, $jobId, $data);
            Response::success($result, 201);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode(), $e->getErrors() ?? null);
        }
    }

    public function status($user)
    {
        try {
            $verification = \Haseri\Backend\Shared\Models\TechnicianVerification::where('user_id', $user->id)->first();
            $status = $verification ? $verification->status : 'unverified';
            Response::success([
                'status' => $status,
                'is_approved' => $status === 'approved'
            ]);
        } catch (\Exception $e) {
            Response::error('Failed to check status', 500);
        }
    }

    public function jobApplications($user, $jobId)
    {
        $result = $this->service->getByJob($jobId);
        Response::success($result);
    }

    public function myApplications($user)
    {
        $result = $this->service->getByProvider($user->id);
        Response::success($result);
    }

    public function accept($user, $applicationId)
    {
        try {
            $result = $this->service->accept($applicationId, $user->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function reject($user, $applicationId)
    {
        try {
            $result = $this->service->reject($applicationId);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function update($user, $applicationId)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->service->update($applicationId, $user->id, $data);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function destroy($user, $applicationId)
    {
        try {
            $result = $this->service->delete($applicationId, $user->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}