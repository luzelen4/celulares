<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
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
        return [
            'watch_name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'brand' => ['nullable', 'string'],
            'stock' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'string'],
            'category_id' => ['required', 'exists:categories,category_id']
        ];
    }
}
