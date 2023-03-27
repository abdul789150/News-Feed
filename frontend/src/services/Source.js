import axios from 'axios';
import { DEV_API_BASE_URL } from '../config'

async function getAllSources() {
  const apiURL = DEV_API_BASE_URL + '/sources/';
  
  const response = await axios.get(apiURL);
  return response.data;
}


export default {
  getAllSources
};
