<?php
namespace Haseri\Backend\Shared\Enums;

class NotificationType
{
    const JOB_ASSIGNED = 'job_assigned';
    const JOB_COMPLETED = 'job_completed';
    const NEW_APPLICATION = 'new_application';
    const APPLICATION_ACCEPTED = 'application_accepted';
    const APPLICATION_REJECTED = 'application_rejected';
    const REVIEW_RECEIVED = 'review_received';
    const VERIFICATION_APPROVED = 'verification_approved';
    const VERIFICATION_REJECTED = 'verification_rejected';
    const PAYMENT_SUCCESS = 'payment_success';
    const SYSTEM = 'system';

    public static function all()
    {
        return [
            self::JOB_ASSIGNED,
            self::JOB_COMPLETED,
            self::NEW_APPLICATION,
            self::APPLICATION_ACCEPTED,
            self::APPLICATION_REJECTED,
            self::REVIEW_RECEIVED,
            self::VERIFICATION_APPROVED,
            self::VERIFICATION_REJECTED,
            self::PAYMENT_SUCCESS,
            self::SYSTEM,
        ];
    }
}