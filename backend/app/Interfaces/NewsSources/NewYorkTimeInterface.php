<?php

namespace App\Interfaces\NewsSources;

interface NewYorkTimeInterface
{
  public function search($keyword, $categories, $fromDate, $toDate);
}
