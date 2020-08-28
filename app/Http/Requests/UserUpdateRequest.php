<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'sometimes|required',
            'age' => 'sometimes|required',
            'location' => 'sometimes|required',
            'lat' => 'sometimes|required',
            'lng' => 'sometimes|required',
            'bio' => 'sometimes|required',
            'photo' => 'sometimes|required|image'
        ];
    }
}
