import request from '@utils/request'

export async function getCommonNoticeList() {
  const res = await request({
    url: `/mobile/notice/commonList`,
    method: 'GET',
  })
  if (res) {
    return res
  }
  return false
}
