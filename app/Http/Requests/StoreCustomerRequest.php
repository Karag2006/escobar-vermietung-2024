<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Setting;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Get the settings that apply to the request.
     *
     * @return array<string, mixed>
     */
    private function get_settings()
    {
        $settings_array = Setting::first()->get();
        $settings = $settings_array[0];
        $license_classes = json_decode($settings["license_classes"]);
        return [
            "license_classes" => $license_classes,
        ];
    }

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
        $settings = $this->get_settings();

        return [
            'pass_number' => 'string|min:8|max:30|nullable',
            'name1' => 'required|string|min:5|max:50',
            'name2' => 'string|max:50|nullable',
            'birth_date' => 'nullable|regex:/^(?:[0-9]{2})\.(?:[0-9]{2})\.(?:[0-9]{4})$/',
            'birth_city' => 'string|min:3|max:50|nullable',
            'plz' => 'nullable|min:4|max:10',
            'city' => 'nullable|string|min:3|max:50',
            'street' => 'nullable|string|min:3|max:50',
            'phone' => 'string|min:6|max:20|nullable',
            'car_number' => 'string|min:5|max:15|nullable',
            'email' => 'email|nullable',
            'driving_license_no' => 'string|min:6|max:15|nullable',
            'driving_license_class' => [
                Rule::in($settings['license_classes']),
                'nullable'
            ],
            'comment' => 'string|max:1000|nullable',
        ];
    }
}
