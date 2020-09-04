<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoryUpdateRequest extends FormRequest
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
            'title' => 'sometimes|required',
            'description' => 'sometimes|required',
            'featured_start_date' => 'sometimes|required|date',
            'featured_end_date' => 'sometimes|required|date|after_or_equal:featured_start_date',
            'tags' => 'sometimes|required',
            'media' => 'sometimes|required|image'
        ];
    }
}
