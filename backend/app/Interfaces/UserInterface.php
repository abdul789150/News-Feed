<?php

namespace App\Interfaces;

use App\Models\User;

interface UserInterface
{
  public function create(array $data);
  public function findByEmail(string $email);
}
