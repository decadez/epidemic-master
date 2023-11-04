import request from '@/utils/request';

export async function getNoticeList() {
  const res = await request(`/notice/list`, {
    method: "GET",
  });
  if (res) {
    return res;
  }
  return false;
}