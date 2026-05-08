<?php
namespace Haseri\Backend\Modules\Technician\Services;

use Haseri\Backend\Shared\Models\TechnicianVerification;
use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Modules\Notifications\Services\AdminNotifier;
use Haseri\Backend\Shared\Helpers\Upload\ImageUploader;
use Haseri\Backend\Shared\Helpers\Upload\FileUploader;
use Haseri\Backend\Shared\Exceptions\ValidationException;
use Haseri\Backend\Shared\Exceptions\NotFoundException;

class TechnicianVerificationService
{
    private $imageUploader;
    private $fileUploader;

    public function __construct()
    {
        $this->imageUploader = new ImageUploader();
        $this->fileUploader = new FileUploader();
    }

    public function submit($userId, array $data, array $files)
    {
        if (empty($files['national_id'])) {
            throw new ValidationException(['national_id' => 'National ID is required']);
        }

        $nationalIdPath = $this->imageUploader->upload($files['national_id'], 'ids');

        $proofPath = null;
        $proofType = null;

        if (!empty($files['proof_document'])) {
            $proofPath = $this->fileUploader->upload($files['proof_document'], 'documents');
            $proofType = $data['proof_document_type'] ?? null;
        }

        $existing = TechnicianVerification::where('user_id', $userId)->first();

        $verification = TechnicianVerification::updateOrCreate(
            ['user_id' => $userId],
            [
                'national_id_path' => $nationalIdPath,
                'proof_document_path' => $proofPath,
                'proof_document_type' => $proofType,
                'status' => 'pending',
            ]
        );

        $user = User::find($userId);
        if ($user) {
            $title = $existing ? 'Verification Updated' : 'New Verification Submitted';
            $message = $user->first_name . ' ' . $user->last_name . ' submitted technician verification documents.';

            AdminNotifier::notifyAll($title, $message, 'verification_submitted', $verification->id);
        }

        return ['message' => 'Verification submitted for review'];
    }

    public function status($userId)
    {
        $verification = TechnicianVerification::where('user_id', $userId)->first();

        return [
            'status' => $verification ? $verification->status : 'not_submitted',
            'rejection_reason' => $verification ? $verification->rejection_reason : null,
            'national_id_path' => $verification ? $verification->national_id_path : null,
            'proof_document_path' => $verification ? $verification->proof_document_path : null,
            'proof_document_type' => $verification ? $verification->proof_document_type : null,
        ];
    }
}