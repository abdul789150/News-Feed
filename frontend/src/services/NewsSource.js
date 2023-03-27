import axios from 'axios';
import { DEV_API_BASE_URL } from '../config'
import { getSessionData } from '../lib/serviceHelper';

async function searchNewsData(data) {
  let apiURL = '';
  let options = {};
  const token = await getSessionData();
  if(token){
    apiURL = DEV_API_BASE_URL + '/user/articles/search/';
    options = {
        headers: {
          Authorization: token
        }
    }
  } else {
    apiURL = DEV_API_BASE_URL + '/articles/search/';
  }

  const response = await axios.post(apiURL, data, options);
  const final_data = setupData(response.data.data)
  return final_data.sort(() => Math.random() - 0.5);
}

async function getNewsData() {
  let apiURL = '';
  let options = {}
  const token = await getSessionData();
  if(token){
    apiURL = DEV_API_BASE_URL + '/user/articles/';
    options = {
        headers: {
          Authorization: token()
        }
    }
  } else {
    apiURL = DEV_API_BASE_URL + '/articles/';
  }

  const response = await axios.get(apiURL, options);
  const final_data = setupData(response.data.data)
  return final_data.sort(() => Math.random() - 0.5);
}

function setupNewsAPI(data){
  const updated_data = []
  for(const item of data){
    updated_data.push({headline: item.title, posted_date: item.publishedAt, main_image: item.urlToImage})
  }
  return updated_data
}

function setupNy(data){
  const updated_data = []
  const base_img_url = 'https://www.nytimes.com/'
  for(const item of data){
    updated_data.push({
      headline: item.headline.main, 
      posted_date: item.pub_date, 
      main_image: base_img_url+item.multimedia[0]?.url
    })
  }
  return updated_data
}

function setupTheGaurdian(data){
  const updated_data = []
  for(const item of data){
    updated_data.push({
      headline: item.webTitle, 
      posted_date: item.webPublicationDate, 
      main_image: item.fields.thumbnail
    })
  }
  return updated_data
}

function setupData(data){
  const final_data = [...setupNewsAPI(data['napi']), ...setupNy(data['ny']), ...setupTheGaurdian(data['tg'])]
  return final_data
}

export default {
  getNewsData,
  searchNewsData
};
