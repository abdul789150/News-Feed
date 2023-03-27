<?php

namespace App\Interfaces;

use App\Models\User;

interface UserPreferenceInterface
{
  public function storeUserPreferences(User $user, $sourceIds, $categoryIds);
  public function getUserPreferences(User $user);
}
