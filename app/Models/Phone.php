<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;

    protected $primaryKey = 'celular_id';

    protected $fillable = [
        'nombre_celular',
        'slug',
        'descripcion',
        'precio',
        'marca',
        'cantidad_en_bodega',
        'url_imagen',
        'cod_categoria'
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeSlug ($query, $slug)
    {
        return $query->where('slug', $slug);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_phones', 'celular_id', 'cod_categoria');
    }
}
