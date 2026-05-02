<?php
namespace Haseri\Backend\Shared\Enums;

class ApplicationStatus
{
    const PENDING = 'pending';
    const ACCEPTED = 'accepted';
    const REJECTED = 'rejected';
    const WITHDRAWN = 'withdrawn';

    public static function all()
    {
        return [
            self::PENDING,
            self::ACCEPTED,
            self::REJECTED,
            self::WITHDRAWN,
        ];
    }
}