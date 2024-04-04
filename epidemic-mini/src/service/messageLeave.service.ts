import request from '@utils/request'

export type MessageLeavePartialDTO = Partial<MessageLeaveDTO>;

export type MessageLeaveDTO = {
  content: string;
  title: string;
  imgUrl: string;
}

export async function getCommonMessageLeaveList(): Promise<MessageLeaveDTO[] | false> {
  const res = await request({
    url: `/mobile/notice/commonList`,
    method: 'GET',
  })
  if (res) {
    return res
  }
  return false
}
