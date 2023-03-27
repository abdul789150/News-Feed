<?php

namespace App\Repositories;

use App\Models\Source;
use App\Interfaces\SourceInterface;

class SourceRepository implements SourceInterface
{
  public function all(): array
  {
    return Source::all()->toArray();
  }

  public function find(int $id): ?Source
  {
    return Source::find($id);
  }

  public function getByIds($sourceIds)
  {
    return Source::find($sourceIds);
  }
}
