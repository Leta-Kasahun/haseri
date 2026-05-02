<?php
namespace Haseri\Backend\Modules\Reviews\Controllers;

use Haseri\Backend\Modules\Reviews\Services\ReviewService;
use Haseri\Backend\Modules\Reviews\Requests\CreateReviewRequest;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class ReviewController
{
    private $service;

    public function __construct()
    {
        $this->service = new ReviewService();
    }

    public function store($user)
    {
        try {
            $request = new CreateReviewRequest();
            $data = $request->validate();
            $result = $this->service->create($user->id, $data);
            Response::success($result, 201);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode(), $e->getErrors() ?? null);
        }
    }

    public function userReviews($userId)
    {
        $result = $this->service->getByUser($userId);
        Response::success($result);
    }

    public function jobReviews($jobId)
    {
        $result = $this->service->getByJob($jobId);
        Response::success($result);
    }
}