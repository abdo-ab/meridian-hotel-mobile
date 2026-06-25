<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'remote_id',
    'uuid',
    'title',
    'description',
    'price',
    'image',
])]
class MobileRoom extends Model
{
    //
}
