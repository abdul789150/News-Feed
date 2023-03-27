<?php

namespace App\Repositories;

use App\Models\User;
use App\Interfaces\UserInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepository implements UserInterface
{
    public function create(array $data): User
    {
      return User::create($data);
    }

    public function findByEmail(string $email): ?User
    {
      try {
        return User::where('email', $email)->firstOrFail();
      } catch (ModelNotFoundException $e) {
        return null;
      }
    }
}
