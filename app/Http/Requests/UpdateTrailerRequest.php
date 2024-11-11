<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrailerRequest extends FormRequest
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
            'title' => 'required|string|min:8|max:50',
            'plateNumber' => 'required|string|max:15',
            'chassisNumber' => 'required|string|max:30',
            'tuev' => 'nullable|string|regex:/^(?:[0-1]{1})(?:[0-9]{1})\/(?:[0-9]{2})$/',
            'inspection_at' => 'nullable|date',
            'totalWeight' => 'required|integer|min:500|max:3500',
            'usableWeight' => 'required|integer|min:1|lt:totalWeight',
            'loading_size' => 'required|array',
            'loading_size.0' => 'required|integer|min:100|max:800',
            'loading_size.1' => 'required|integer|min:50|max:250',
            'loading_size.2' => 'nullable|integer|min:1|max:250',
            'comment' => 'string|max:1000|nullable',
        ];
    }
}
