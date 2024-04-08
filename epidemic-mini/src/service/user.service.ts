import request from '@utils/request'

export async function wxLogin() {
  const res = await request({
    url: `/mobile/user/wxLogin?openId=2`,
    method: 'GET',
  })
  if (res) {
    return res;
  }
  return false
}

export async function getUserInfo() {
  const res = await request({
    url: `/mobile/user/info`,
    method: "GET",
  });
  if (res) {
    return res;
  }
  return false;
}