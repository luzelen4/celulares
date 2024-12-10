<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'cod_categoria';

    protected $fillable = [
        'category_name'
    ];

    public function products()
    {
        return $this->belongsToMany(Phone::class, 'category_phones', 'cod_categoria', 'celular_id');
    }
}
