<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $customer = [
            'id' => $this->id,
            'pass_number' => $this->pass_number == null ? '' : $this->pass_number,
            'name1' => $this->name1 == null ? '' : $this->name1,
            'name2' => $this->name2 == null ? '' : $this->name2,
            'street' => $this->street == null ? '' : $this->street,
            'plz' => $this->plz == null ? '' : $this->plz,
            'city' => $this->city == null ? '' : $this->city,
            'birth_date' => $this->birth_date == null ? '' : $this->birth_date,
            'birth_city' => $this->birth_city == null ? '' : $this->birth_city,
            'phone' => $this->phone == null ? '' : $this->phone,
            'car_number' => $this->car_number == null ? '' : $this->car_number,
            'email' => $this->email == null ? '' : $this->email,
            'driving_license_no' => $this->driving_license_no == null ? '' : $this->driving_license_no,
            'driving_license_class' => $this->driving_license_class == null ? '' : $this->driving_license_class,
            'comment' => $this->comment == null ? '' : $this->comment,
        ];

        return $customer;
    }
}
