import axios from 'axios';
import { DEV_API_BASE_URL } from '../config'

async function getAllCategories() {
  const apiURL = DEV_API_BASE_URL + '/categories/';

  const response = await axios.get(apiURL);
  return response.data;
}


export default {
  getAllCategories
};
