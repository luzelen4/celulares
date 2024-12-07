<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watch extends Model
{
    use HasFactory;

    protected $primaryKey = 'watch_id';

    protected $fillable = [
        'watch_name',
        'slug',
        'description',
        'price',
        'brand',
        'stock',
        'image',
        'category_id'
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
        return $this->belongsToMany(Category::class, 'category_watches', 'watch_id', 'category_id');
    }
}
