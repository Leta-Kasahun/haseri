<?php
namespace Haseri\Backend\Shared\Traits;

trait HasLocation
{
    public function address()
    {
        return $this->hasOne(\Haseri\Backend\Shared\Models\Address::class, 'user_id');
    }

    public function getFullAddress()
    {
        $address = $this->address;
        if (!$address) return null;

        return implode(', ', array_filter([
            $address->specific_location,
            $address->kebele,
            $address->woreda,
            $address->sub_city,
            $address->city,
        ]));
    }
}