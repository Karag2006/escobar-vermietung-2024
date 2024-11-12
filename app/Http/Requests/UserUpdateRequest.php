<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
            'username'  =>  ['required','string','max:30',Rule::unique(User::class)->ignore($this->user->id)],
            'email'     =>  'required|string|email|max:191',
            'password'  =>  'sometimes|string|confirmed|min:6|max:191'
        ];
    }
}
