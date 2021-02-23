<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $fillabel = ['nome','custo','preco','quantidade'];
    protected $guarded = [];
}
