<?php

namespace App\Http\Controllers;

use App\Services\UserPreferencesService;
use Illuminate\Http\Request;

class UserPreferencesController extends Controller
{
    private $userPreferencesService;

    public function __construct(UserPreferencesService $userPreferencesService)
    {
        $this->userPreferencesService = $userPreferencesService;
    }

    public function save(Request $request)
    {
        $user = $request->user();
        $allData = $request->all();

        $sourceIds = $allData['source_ids'];
        $categoryIds = $allData['category_ids'];

        $this->userPreferencesService->storeUserPreferences($user, $sourceIds, $categoryIds);
        return response()->json(['message' => 'Preferences saved']);
    }

    public function get(Request $request)
    {
        $user = $request->user();
        $preferences = $this->userPreferencesService->getUserPreferences($user);
        return response()->json(['preferences' => $preferences]);
    }
}
