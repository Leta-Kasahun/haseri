<?php
namespace Haseri\Backend\Shared\Enums;
class JobStatus
{
    const OPEN = 'open';
    const ASSIGNED = 'assigned';
    const IN_PROGRESS = 'in_progress';
    const COMPLETED = 'completed';
    const CANCELLED = 'cancelled';

    public static function all()
    {
        return [
            self::OPEN,
            self::ASSIGNED,
            self::IN_PROGRESS,
            self::COMPLETED,
            self::CANCELLED,
        ];
    }
}