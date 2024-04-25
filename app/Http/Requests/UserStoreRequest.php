<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
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
            'name'      =>  'required|string|max:50',
            'username'  =>  'required|string|unique:users|max:30',
            'email'     =>  'required|string|email|max:191',
            'password'  =>  'required|string|confirmed|min:6|max:191'
        ];
    }
}
