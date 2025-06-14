<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GroupStoreRequest extends FormRequest
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
            'name' => 'required',
            'description' => 'required',
            'location' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'privacy' => 'required',
            'term' => 'sometimes|required',
            'need' => 'sometimes|required',
        ];
    }
}
