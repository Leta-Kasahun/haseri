<?php
namespace Haseri\Backend\Shared\Enums;
class PaymentType
{
    const JOB_POST = 'job_post';
    const CUSTOMER_VERIFICATION = 'customer_verification';
    const COMMISSION = 'commission';

    public static function all()
    {
        return [
            self::JOB_POST,
            self::CUSTOMER_VERIFICATION,
            self::COMMISSION,
        ];
    }
}