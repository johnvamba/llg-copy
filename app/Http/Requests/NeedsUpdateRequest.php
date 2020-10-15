<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NeedsUpdateRequest extends FormRequest
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
            'category' => 'sometimes|required',
            'needs_type_id' => 'sometimes|required',
            'title' => 'sometimes|required',
            'description' => 'sometimes|required',
            'raised' => 'sometimes|required',
            'goal' => 'sometimes|required',
            'location' => 'sometimes|required',
            'lat' => 'sometimes|required',
            'lng' => 'sometimes|required',
        ];
    }
}
