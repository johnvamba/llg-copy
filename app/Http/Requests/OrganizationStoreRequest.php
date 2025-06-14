<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationStoreRequest extends FormRequest
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
            'category' => 'required',
            'name' => 'required',
            'email' => 'required|unique:organizations|email',
            'description' => 'required',
            'location' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'photo' => 'sometimes|required',
            'cover_photo' => 'sometimes|required',
            'secretKey' => 'sometimes|required',
            'publishableKey' => 'sometimes|required',
        ];
    }
}
