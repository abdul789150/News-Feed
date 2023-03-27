<?php

namespace App\Http\Controllers;

use App\Services\SourceService;
use Illuminate\Http\Request;

class SourceController extends Controller
{
    private $sourceService;

    public function __construct(SourceService $sourceService)
    {
        $this->sourceService = $sourceService;
    }

    public function getAllSources(Request $request){
        $sources = $this->sourceService->getAll();
        return response()->json(['sources' => $sources]);
    }
}
