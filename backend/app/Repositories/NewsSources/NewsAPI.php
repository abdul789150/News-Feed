<?php

namespace App\Repositories\NewsSources;

use App\Models\Source;
use GuzzleHttp\Client;
use App\Interfaces\NewsSources\NewsApiInterface;

class NewsAPI implements NewsApiInterface
{
    private $apiKey;
    private $client;

    public function __construct()
    {
        // Fetch API Key From Database
        $this->apiKey = Source::where('id','3')->first(['api_key'])->api_key;
        $this->client = new Client([
            'base_uri' => 'https://newsapi.org/v2/everything',
        ]);
    }

    public function search($keyword, $categories, $fromDate, $toDate)
    { 
        #Setup Query
        $q = '';

        if($keyword){
            $q .= $keyword;
        }

        if(strlen($q) >= 1) {
            $q .= " AND ";
        }
        
        #Setup Categories
        foreach($categories as $key => $element) {
            if ($key === array_key_first($categories)) {
                $q .= "(";
            }

            $q .= $element['category_search_name'];

            if ($key === array_key_last($categories)) {
                $q .= ")";
            } else {
                $q .= " OR ";
            }
        }

        $query_array = array();
        $query_array['q'] = $q;
        
        if($fromDate) {
            $query_array['from'] = $fromDate;
        }

        if($toDate) {
            $query_array['to'] = $toDate;
        }

        $query_array['apiKey'] = $this->apiKey;
        
        # /v2/everything
        # Date Format: 2018-11-16 or 2018-11-16T16:19:03
        $response = $this->client->request('GET', '', [
            'query' => $query_array,
        ]);
        
        return json_decode($response->getBody()->getContents(), true)['articles'];
    }
}
