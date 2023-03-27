<?php

namespace App\Services;

use App\Models\User;
use App\Interfaces\UserInterface;
use App\Interfaces\UserPreferenceInterface;

class UserPreferencesService implements UserPreferenceInterface
{
    private $userInterface;

    public function __construct(UserInterface $userInterface)
    {
        $this->userInterface = $userInterface;
    }

    public function storeUserPreferences(User $user, $sourceIds, $categoryIds)
    {
        $user->preferredSources()->sync($sourceIds);
        $user->preferredCategories()->sync($categoryIds);
    }

    public function getUserPreferences(User $user)
    {
        return [
            'preferred_sources' => $user->preferredSources,
            'preferred_categories' => $user->preferredCategories
        ];
    }

    // public function getAllCategories()
    // {
    //     return $this->categoryInterface->all();
    // }

    // public function getAllSources()
    // {
    //     return $this->sourceInterface->all();
    // }
}
