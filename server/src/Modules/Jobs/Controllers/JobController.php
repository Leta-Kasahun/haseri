<?php
namespace Haseri\Backend\Modules\Jobs\Controllers;

use Haseri\Backend\Modules\Jobs\Services\JobService;
use Haseri\Backend\Modules\Jobs\Requests\CreateJobRequest;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class JobController
{
    private $service;

    public function __construct()
    {
        $this->service = new JobService();
    }

    public function index()
    {
        $filters = $_GET;
        $result = $this->service->getAll($filters);
        Response::success($result);
    }

    public function show($id)
    {
        try {
            $result = $this->service->getById($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function store($user)
    {
        try {
            $request = new CreateJobRequest();
            $data = $request->validate();
            $result = $this->service->create($user->id, $data);
            Response::success($result, 201);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode(), $e->getErrors() ?? null);
        }
    }

    public function initiatePayment($user)
    {
        try {
            $request = new CreateJobRequest();
            $data = $request->validate();
            $result = $this->service->initiatePayment($user->id, $data);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode(), $e->getErrors() ?? null);
        }
    }

    public function confirmPayment($user)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $txRef = $data['tx_ref'] ?? null;
            $jobId = $data['job_id'] ?? null;
            
            if (!$txRef && !$jobId) {
                throw new \Haseri\Backend\Shared\Exceptions\ValidationException(['tx_ref' => 'Transaction reference or Job ID is required']);
            }
            
            $result = $this->service->confirmPayment($user->id, $txRef, $jobId);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function myJobs($user)
    {
        $result = $this->service->getByCustomer($user->id);
        Response::success($result);
    }

    public function complete($user, $id)
    {
        try {
            $result = $this->service->complete($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function cancel($user, $id)
    {
        try {
            $result = $this->service->cancel($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function destroy($id)
    {
        try {
            $this->service->delete($id);
            Response::success(['message' => 'Job deleted successfully']);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function destroyByUser($user, $id)
    {
        try {
            $this->service->deleteByUser($user->id, $id);
            Response::success(['message' => 'Job deleted successfully']);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function update($user, $id)
    {
        try {
            $data = $_POST;
            if (empty($data)) {
                $data = json_decode(file_get_contents('php://input'), true);
            }
            $result = $this->service->update($user->id, $id, $data);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}