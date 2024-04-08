import request from '@utils/request'

export type MessageLeavePartialDTO = Partial<MessageLeaveDTO>;

export type MessageLeaveDTO = {
  content: string;
  title: string;
}

export async function createMessage(params: MessageLeavePartialDTO): Promise<MessageLeaveDTO[] | false> {
  const res = await request({
    url: `/mobile/leaveMessage/create`,
    method: 'post',
    payload: params
  })
  if (res) {
    return res;
  }
  return false
}

export async function getCommonMessageLeaveList(): Promise<MessageLeaveDTO[] | false> {
  const res = await request({
    url: `/mobile/leaveMessage/commonList`,
    method: 'GET',
  })
  if (res) {
    return res
  }
  return false
}
