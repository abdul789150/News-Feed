<?php

namespace App\Services;

use App\Interfaces\SourceInterface;

class SourceService
{
  private $sourceInterface;

  public function __construct(SourceInterface $sourceInterface)
  {
    $this->sourceInterface = $sourceInterface;
  }

  public function getAll(){
    return $this->sourceInterface->all();
  }
}