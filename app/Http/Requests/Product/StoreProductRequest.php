<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'nombre_celular' => ['string','max:255'],
            'slug' => ['string'],
            'descripcion' => ['nullable','string'],
            'precio' => ['required','numeric','min:0'],
            'marca' => ['nullable','string'],
            'cantidad_en_bodega' => ['required','integer','min:0'],
            'url_imagen' => ['required','file','mimes:jpg,jpeg,png'],
            'cod_categoria' => ['required','exists:categories,cod_categoria']
        ];
    }
}
