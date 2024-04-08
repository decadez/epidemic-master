import Taro from '@tarojs/taro';

enum StatusCode {
  SUCCESS = 200,
  ERROR = 500,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  TIMEOUT = 408,
}
/**
 * 简易封装网络请求
 * @param {*} options
 */
export default async function fetch(options) {
  const {
    url,
    payload,
    method = 'GET',
    showToast = true,
  } = options;
  const header = {};
  if (method === 'POST') {
    header['content-type'] = 'application/json';
  }

  const accessToken = localStorage.getItem('token');
  
  if (accessToken) {
    header['token'] = accessToken;
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header,
  })
    .then(async (res) => {
      const { code, data } = res.data;
      switch (code) {
        case StatusCode.ERROR:
          Taro.redirectTo({
            url: '/pages/no-permission',
          });
        default:
          return data;
      }
    })
    .catch((err) => {
      if (showToast) {
        Taro.showToast({
          title: (err && err.errorMsg) || '请求失败',
          icon: 'none',
        });
      }

      return Promise.reject({ message: '请求失败', ...err });
    });
}
