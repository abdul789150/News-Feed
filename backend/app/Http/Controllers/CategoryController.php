<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function getAllCategories(Request $request){
        $categories = $this->categoryService->getAll();
        return response()->json(['categories' => $categories]);
    }
}
