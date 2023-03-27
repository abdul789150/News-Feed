import axios from 'axios';
import { DEV_API_BASE_URL } from '../config'

async function loginApi(formData) {
  const apiURL = DEV_API_BASE_URL + '/login';
  const response = await axios.post(apiURL, formData);
  return response.data;
}

async function registerApi(formData) {
  const apiURL = DEV_API_BASE_URL + '/register';
  const response = await axios.post(apiURL, formData);
  return response.data;
}

export {
  loginApi,
  registerApi
};
