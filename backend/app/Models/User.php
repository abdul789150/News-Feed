<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['fullname', 'email', 'password'];

    public function preferredSources()
    {
        return $this->belongsToMany(Source::class, 'user_preferred_sources');
    }

    public function preferredCategories()
    {
        return $this->belongsToMany(Category::class, 'user_preferred_categories');
    }
}
