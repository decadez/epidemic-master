import Taro from '@tarojs/taro';

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
    autoLogin = true,
  } = options;
  const header = {};
  if (method === 'POST') {
    header['content-type'] = 'application/json';
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header,
  })
    .then(async (res) => {
      const { code, data } = res.data;
      return data;
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
