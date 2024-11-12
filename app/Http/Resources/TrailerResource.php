<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrailerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $trailer = [
            'id' => $this->id,
            'title' => $this->title ?? '',
            'plateNumber' => $this->plateNumber ?? '',
            'chassisNumber' => $this->chassisNumber ?? '',
            'tuev' => $this->tuev ?? '',
            'inspection_at' => $this->inspection_at,
            'totalWeight' => $this->totalWeight ?? '',
            'usableWeight' => $this->usableWeight ?? '',
            'loading_size' => $this->loading_size ?? [],
            'comment' => $this->comment ?? '',
        ];

        return $trailer;
    }
}
