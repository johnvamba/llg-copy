<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
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
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8',
            'firstName' => 'required',
            'lastName' => 'required',
            'age' => 'required',
            'location' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'bio' => 'required',
            'photo' => 'sometimes|required|image',
            'role' => 'required'
        ];
    }
}
