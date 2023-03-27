<?php

namespace App\Interfaces\NewsSources;

interface TheGaurdianInterface
{
  public function search($keyword, $categories, $fromDate, $toDate);
}
