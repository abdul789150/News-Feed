<?php

namespace App\Interfaces;

use App\Models\Category;

interface CategoryInterface
{
  public function all(): array;
  public function find(int $id): ?Category;
  public function findBySearchName(string $searchName): ?Category;
  public function getByIds($categoryIds);
}
