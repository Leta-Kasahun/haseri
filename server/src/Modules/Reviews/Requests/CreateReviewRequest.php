<?php
namespace Haseri\Backend\Modules\Reviews\Requests;

use Haseri\Backend\Shared\Exceptions\ValidationException;

class CreateReviewRequest
{
    public function validate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $errors = [];

        if (empty($data['job_id'])) {
            $errors['job_id'] = 'Job ID is required';
        }

        if (empty($data['reviewed_user_id'])) {
            $errors['reviewed_user_id'] = 'Reviewed user is required';
        }

        if (empty($data['rating'])) {
            $errors['rating'] = 'Rating is required';
        } elseif ($data['rating'] < 1 || $data['rating'] > 5) {
            $errors['rating'] = 'Rating must be between 1 and 5';
        }

        if (!empty($data['comment']) && strlen($data['comment']) > 1000) {
            $errors['comment'] = 'Comment must not exceed 1000 characters';
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        return $data;
    }
}