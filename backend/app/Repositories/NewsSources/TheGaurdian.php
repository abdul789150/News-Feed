<?php

namespace App\Repositories\NewsSources;

use App\Models\Source;
use GuzzleHttp\Client;
use App\Interfaces\NewsSources\TheGaurdianInterface;

class TheGaurdian implements TheGaurdianInterface
{
  private $apiKey;
  private $client;

  public function __construct()
  {    
    $this->apiKey = Source::where('id','2')->first(['api_key'])->api_key;
    $this->client = new Client([
      'base_uri' => 'https://content.guardianapis.com/search',
    ]);
  }

  public function setupSearchQuery() {    }

  public function search($keyword, $categories, $fromDate, $toDate)
  {
    #Setup Query
    $query_array = array();
  
    if ($keyword) {
      $query_array['q'] = $keyword;
    }
    
    $section = '';
    #Setup Categories
    foreach($categories as $key => $element) {
      if ($key === array_key_first($categories)) {
        $section .= "(";
      }

      $section .= $element['category_search_name'];

      if ($key === array_key_last($categories)) {
        $section .= ")";
      } else {
        $section .= "|";
      }
    }

    $query_array['section'] = $section;

    #Date Setup
    if($fromDate){
      $query_array['from-date'] = $fromDate;        
    }
    if($toDate){
      $query_array['to-date'] = $toDate;
    }

    $query_array['show-fields'] = 'thumbnail';
    $query_array['api-key'] = $this->apiKey;


    #Date Setup (is Already in right Format)
    $response = $this->client->request('GET', '', [
      'query' => $query_array,
    ]);
    
    return json_decode($response->getBody()->getContents(), true)['response']['results'];
  }
}
