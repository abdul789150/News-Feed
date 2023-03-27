import axios from 'axios';
import { DEV_API_BASE_URL } from '../config'
import { getSessionData } from '../lib/serviceHelper';

async function getUserPreferences() {
  const apiURL = DEV_API_BASE_URL + '/user/preferences/';
  const token = await getSessionData() 
  const options = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.get(apiURL, options);
  return response.data;
}

async function saveUserPreferences(data) {
  const apiURL = DEV_API_BASE_URL + '/user/preferences/';
  const token = await getSessionData() 
  const options = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.post(apiURL, data, options);
  return response.data;
}

export default {
  getUserPreferences,
  saveUserPreferences
};
