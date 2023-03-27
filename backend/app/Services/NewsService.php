<?php

namespace App\Services;

use App\Interfaces\NewsSources\TheGaurdianInterface;
use App\Interfaces\NewsSources\NewYorkTimeInterface;
use App\Interfaces\NewsSources\NewsApiInterface;

use App\Models\Category;
use App\Models\Source;

class NewsService
{
  private $theGaurdianInterface;
  private $newYorkTimeInterface;
  private $newsApiInterface;

  public function __construct(TheGaurdianInterface $theGaurdianInterface, NewYorkTimeInterface $newYorkTimeInterface, NewsApiInterface $newsApiInterface)
  {
    $this->theGaurdianInterface = $theGaurdianInterface;
    $this->newYorkTimeInterface = $newYorkTimeInterface;
    $this->newsApiInterface = $newsApiInterface;
  }

  public function getUserSources($user)
  {
    $sources = [];
    if($user){
      $sources = $user->preferredSources->toArray();
    }

    if(count($sources) == 0) {
      $sources = Source::all()->toArray();
    }

    return $sources;
  }

  public function getUserCategories($user)
  {
    $categories = [];
    if($user){
      $categories = $user->preferredCategories->toArray();
    }

    if(count($categories) == 0) {
      $categories = Category::all()->toArray();
    }

    return $categories;    
  }

  public function searchArticles($user, $category, $keywords, $fromDate, $toDate)
  {
    $sources = $this->getUserSources($user);
    if($category){
      $categories = Category::where('id', '=', $category)->get();
    } else {
      $categories = $this->getUserCategories($user);
    }
    

    $data_array = array();

    foreach($sources as $source){
      if($source['id'] == 1){
        // New York Times
        $data_array['ny'] = $this->newYorkTimeInterface->search($keywords, $categories, $fromDate, $toDate);
      } else if ($source['id'] == 2) {
        // The Gaurdian
        $data_array['tg'] = $this->theGaurdianInterface->search($keywords, $categories, $fromDate, $toDate);
      } else if ($source['id'] == 3) {
        // News API
        $data_array['napi'] = $this->newsApiInterface->search($keywords, $categories, $fromDate, $toDate);
      }
    }

    return $data_array;
  }
}
