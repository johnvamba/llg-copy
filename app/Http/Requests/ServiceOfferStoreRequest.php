<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceOfferStoreRequest extends FormRequest
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
            'service_type_id' => 'required',
            'name' => 'sometimes|required',
            'title' => 'required',
            'description' => 'required',
            'business_name' => 'required',
            'business_contact' => 'required',
            'end_date' => 'required',
            'location' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'tags' => 'sometimes|required',
            'media' => 'sometimes|required'
        ];
    }
}
