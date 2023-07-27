import umiRequest from 'umi-request';

const baseUrl = 'http://localhost:8080';

const request = (
  url: string,
  {
    method = 'GET',
    params,
    noAccess = false,
  }: { method: string; params?: any; noAccess?: boolean }
) => {
  let accessToken = null;
  if (!noAccess) {
    accessToken = localStorage.getItem('persist:root')
      ? JSON.parse(localStorage.getItem('persist:root')).token
      : null;

    accessToken = accessToken.substr(1);
    accessToken = accessToken.substring(0, accessToken.length - 1);
  }

  return umiRequest(`${baseUrl}${url}`, {
    method,
    [method === 'GET' ? 'params' : 'data']: params,
    headers: {
      token: accessToken,
    },
  });
};

export default request;
