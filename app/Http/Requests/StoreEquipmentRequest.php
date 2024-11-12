<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'                  =>  'required|string|min:5|max:50',
            'details'               =>  'nullable|string|min:10|max:600',
            // 12.11.2024 - Error Handling : defaultNumber sollte nur ganze zahlen zwischen 1 und 99 enthalten
            'defaultNumber'         =>  'nullable|integer|min:1|max:99'
        ];
    }
}
