<?php

namespace App\Repositories\NewsSources;

use App\Models\Source;
use GuzzleHttp\Client;
use App\Interfaces\NewsSources\NewYorkTimeInterface;

class NewYorkTimes implements NewYorkTimeInterface
{
    private $apiKey;
    private $client;

    public function __construct()
    {
      $this->apiKey = Source::where('id','1')->first(['api_key'])->api_key;
      $this->client = new Client([
          'base_uri' => 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      ]);
    }

    public function setupSearchQuery() {    }

    public function search($keyword, $categories, $fromDate, $toDate)
    {
      #Setup Query
      $fq = '';

      if($keyword){
        $fq .= $keyword;
      }

      #Setup Categories
      foreach($categories as $key => $element) {
        if ($key === array_key_first($categories)) {
          if(strlen($fq) >= 1) {
            $fq .= " AND ";
          }

          $fq .= "section_name:(";
        }

        $fq = $fq . '"' . $element['category_search_name'] . '"';

        if ($key === array_key_last($categories)) {
          $fq .= ")";
        } else {
          $fq .= " OR ";
        }
      }

      $query_array = array();
      $query_array['fq'] = $fq;

      #Date Setup
      if($fromDate){
        $fromDate = implode(explode("-", $fromDate));
        $query_array['begin_date'] = $fromDate;        
      }
      if($toDate){
        $toDate = implode(explode("-", $toDate));
        $query_array['end_date'] = $toDate;
      }

      $query_array['api-key'] = $this->apiKey;

      $response = $this->client->request('GET', '', [
        'query' => $query_array,
      ]);
      
      return json_decode($response->getBody()->getContents(), true)['response']['docs'];
    }
}
