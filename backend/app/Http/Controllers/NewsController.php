<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\NewsService;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    private $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function getArticles(Request $request) 
    {
        $user = $request->user();
        $articles = $this->newsService->searchArticles($user, NULL, NULL, NULL, NULL);
        
        return response()->json([
            'data' => $articles,
            'message' => 'Articles fetched successfully'
        ]);
    }

    public function search(Request $request)
    {
        $keywords = $request->input('keywords');
        $fromDate = $request->input('fromDate');
        $toDate = $request->input('toDate');
        $category = $request->input('category');

        $user = $request->user();
        $articles = $this->newsService->searchArticles($user, $category, $keywords, $fromDate, $toDate);
        
        return response()->json([
            'data' => $articles,
            'message' => 'Articles fetched successfully'
        ]);
    }
}
