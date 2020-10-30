<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use App\User;

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
    public function rules(Request $request)
    {
        return [
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required|unique:users,email,'.$request->id,
            'age' => 'required',
            'location' => 'required',
            'lat' => 'sometimes|required',
            'lng' => 'sometimes|required',
            'bio' => 'sometimes|required',
            'photo' => 'sometimes|required',
            'coverPhoto' => 'sometimes|required'
        ];
    }
}
