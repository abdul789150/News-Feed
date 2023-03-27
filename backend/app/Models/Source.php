<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
  use HasFactory;

  protected $fillable = [
    'source_name',
    'source_id',
    'api_key',
  ];

  public function users()
  {
    return $this->belongsToMany(User::class, 'user_preferred_sources');
  }
}
