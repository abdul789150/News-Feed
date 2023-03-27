<?php

namespace App\Interfaces\NewsSources;

interface NewsApiInterface
{
  public function search($keyword, $categories, $fromDate, $toDate);
}
