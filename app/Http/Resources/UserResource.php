<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = [
            'id' => $this->id,
            'username' => $this->username === null ? '' : $this->username,
            'name' => $this->name === null ? '' : $this->name,
            'email' => $this->email === null ? '' : $this->email,
            'password' => '',
        ];

        return $user;
    }
}
