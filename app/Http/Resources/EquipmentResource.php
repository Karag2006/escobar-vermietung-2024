<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $equipment = [
            'id'            => $this->id,
            'name'          => $this->name ?? '',
            'details'       => $this->details ?? '',
            'defaultNumber' => $this->defaultNumber ?? '',
        ];

        return $equipment;
    }
}
