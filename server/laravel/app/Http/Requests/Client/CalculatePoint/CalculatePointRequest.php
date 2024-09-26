<?php

namespace App\Http\Requests\Client\CalculatePoint;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CalculatePointRequest extends FormRequest
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
            'user_id' => [
                'required',
                Rule::exists('users', 'id')
            ],
            'status' => ['required',
                Rule::in(User::statusGame())
                ],
            'amount_coin' => 'required|min:1|integer',
        ];
    }
}
