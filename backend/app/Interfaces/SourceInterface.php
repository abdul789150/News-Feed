<?php

namespace App\Interfaces;

use App\Models\Source;

interface SourceInterface
{
  public function all();
  public function find(int $id);
  public function getByIds($sourceIds);
}
