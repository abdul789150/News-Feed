<?php

namespace App\Repositories;

use App\Models\Article;
use App\Interfaces\ArticleInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ArticleRepository implements ArticleInterface
{
    public function search($keyword, $category, $source, $fromDate, $toDate)
    {
      $query = Article::query();

      if ($keyword) {
        $query->where(function ($q) use ($keyword) {
          $q->where('title', 'LIKE', '%' . $keyword . '%')
            ->orWhere('body', 'LIKE', '%' . $keyword . '%');
        });
      }

        if ($category) {
          $query->where('category', $category);
        }

        if ($source) {
          $query->where('source', $source);
        }

        if ($fromDate) {
          $query->whereDate('published_at', '>=', $fromDate);
        }

        if ($toDate) {
          $query->whereDate('published_at', '<=', $toDate);
        }

      return $query->get();
    }
}
