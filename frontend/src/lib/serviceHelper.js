import Cookies from 'universal-cookie';

async function getSessionData() {
  const cookies = new Cookies();

  return cookies.get('user');
}

function logoutUser() {
  document.cookie = 'user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export { getSessionData, logoutUser };
