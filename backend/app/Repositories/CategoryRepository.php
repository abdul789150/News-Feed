<?php

namespace App\Repositories;

use App\Models\Category;
use App\Interfaces\CategoryInterface;

class CategoryRepository implements CategoryInterface
{
  public function all(): array
  {
    return Category::all()->toArray();
  }

  public function find(int $id): ?Category
  {
    return Category::find($id);
  }

  public function findBySearchName(string $searchName): ?Category
  {
    return Category::where('category_search_name', $searchName)->first();
  }

  public function getByIds($categoryIds)
  {
    return Category::find($categoryIds);
  }
}
