<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'category_id';

    protected $fillable = [
        'category_name'
    ];

    public function products()
    {
        return $this->belongsToMany(Watch::class, 'category_watches', 'category_id', 'watch_id');
    }
}
