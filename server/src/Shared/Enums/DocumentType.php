<?php
namespace Haseri\Backend\Shared\Enums;

class DocumentType
{
    const COC = 'coc';
    const TVET_DIPLOMA = 'tvet_diploma';
    const LOCAL_PERMIT = 'local_permit';
    const WORK_EXPERIENCE = 'work_experience';

    public static function all()
    {
        return [
            self::COC,
            self::TVET_DIPLOMA,
            self::LOCAL_PERMIT,
            self::WORK_EXPERIENCE,
        ];
    }
}