import Qs from 'query-string'
import { extend } from 'umi-request';
import { Message } from '@arco-design/web-react';

const baseUrl = 'http://localhost:8080';

enum StatusCode {
  SUCCESS = 200,
  ERROR = 500,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  TIMEOUT = 408,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean
  data: any
  code?: StatusCode
  errorMessage?: string
}

const accessToken = JSON.parse(localStorage.getItem('persist:root'))?.token || '';

const request = extend({
  prefix: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    token: accessToken.substring(1, accessToken.length - 1),
  },
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'bracket' })
  },
})

request.interceptors.response.use(async (response) => {
  const { success, data, code, errorMessage } = (await response
    .clone()
    .json()) as ResponseStructure
  if (success) {
    return response;
  }
  switch (code) {
    case StatusCode.ERROR:
      // window.location.href = '/login';
      localStorage.setItem('userStatus', 'logout');
      Message.error(errorMessage);
      return
    case StatusCode.NOT_FOUND:
      Message.error(errorMessage);
      return
    case StatusCode.UNAUTHORIZED:
      Message.error(errorMessage);
      return
    case StatusCode.FORBIDDEN:
      Message.error(errorMessage);
      return
    case StatusCode.TIMEOUT:
      Message.error(errorMessage);
      return
    default:
      return response;
  }
})

export default request
