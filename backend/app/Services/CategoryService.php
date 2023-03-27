<?php

namespace App\Services;

use App\Interfaces\CategoryInterface;

class CategoryService
{
  private $categoryInterface;

  public function __construct(CategoryInterface $categoryInterface)
  {
    $this->categoryInterface = $categoryInterface;
  }

  public function getAll(){
    return $this->categoryInterface->all();
  }
}