<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreferredSource extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'source_id',
    ];

    public function user()
    {
      return $this->belongsTo(User::class);
    }

    public function source()
    {
      return $this->belongsTo(Source::class);
    }
}
