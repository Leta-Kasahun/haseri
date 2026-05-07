<?php
namespace Haseri\Backend\Modules\Customer\Verification\Services;

use Haseri\Backend\Shared\Models\CustomerVerification;
use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\Notification;
use Haseri\Backend\Shared\Enums\NotificationType;
use Haseri\Backend\Modules\Notifications\Services\AdminNotifier;
use Haseri\Backend\Modules\Payments\Services\PaymentService;

class CustomerVerificationService
{
    private $paymentService;

    public function __construct()
    {
        $this->paymentService = new PaymentService();
    }

    public function initiate($userId)
    {
        $user = User::find($userId);
        $config = require __DIR__ . '/../../../../Config/chapa.php';

        return $this->paymentService->initiate([
            'user_id' => $userId,
            'amount' => $config['verification_fee'],
            'email' => $user->email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'payment_type' => 'customer_verification',
            'title' => 'Customer Verification',
            'description' => 'Identity verification for reviews',
        ]);
    }

    public function confirm($userId)
    {
        $verification = CustomerVerification::updateOrCreate(
            ['user_id' => $userId],
            ['status' => 'verified', 'verified_at' => now()]
        );

        Notification::create([
            'user_id' => $userId,
            'title' => 'Verification Completed',
            'message' => 'Your customer verification has been completed successfully.',
            'type' => NotificationType::PAYMENT_SUCCESS,
            'reference_id' => $verification->id,
        ]);

        $user = User::find($userId);
        if ($user) {
            AdminNotifier::notifyAll(
                'Customer Verification Completed',
                $user->first_name . ' ' . $user->last_name . ' completed customer verification payment.',
                'customer_verification_completed',
                $verification->id
            );
        }

        return ['verified' => true];
    }

    public function status($userId)
    {
        $verification = CustomerVerification::where('user_id', $userId)->first();

        return [
            'verified' => $verification && $verification->status === 'verified',
            'verified_at' => $verification ? $verification->verified_at : null,
        ];
    }
}