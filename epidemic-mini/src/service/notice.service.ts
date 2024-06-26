import request from '@utils/request'

export type NoticePartialDTO = Partial<NoticeDTO>;

export type NoticeDTO = {
  content: string;
  title: string;
  imgUrl: string;
}

export async function getCommonNoticeList(): Promise<NoticeDTO[] | false> {
  const res = await request({
    url: `/mobile/notice/commonList`,
    method: 'GET',
  })
  if (res) {
    return res
  }
  return false
}
