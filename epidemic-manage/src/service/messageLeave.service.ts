import request from '@/utils/request'

export type MessageLeavePartialDTO = Partial<MessageLeaveDTO>;

export type MessageLeaveDTO = {
  content: string;
  title: string;
  imgUrl: string;
}

export async function editMessage(leaveMessage: MessageLeavePartialDTO) {
  const res = await request(`/leaveMessage/edit`, {
    method: 'POST',
    data: leaveMessage,
  })
  if (res) {
    return res
  }
  return false
}
export async function publishMessage(leaveMessage: MessageLeavePartialDTO) {
  const res = await request(`/leaveMessage/publish`, {
    method: 'POST',
    data: leaveMessage,
  })
  if (res) {
    return res
  }
  return false
}

export async function deleteMessage(id: number) {
  const res = await request(`/leaveMessage/delete`, {
    method: 'GET',
    params: {
      id,
    },
  })
  if (res) {
    return res
  }
  return false
}
export async function createMessage({
  imgUrl,
  title,
  content,
}: {
  imgUrl: string
  title: string
  content: string
}) {
  const res = await request(`/leaveMessage/create`, {
    method: 'POST',
    data: {
      imgUrl,
      title,
      content,
    },
  })
  if (res) {
    return res
  }
  return false
}

export async function getMessageList({
  page,
  pageSize,
  title,
  start,
  end,
  status,
  creators,
  isOwnSelf,
  natureOfSpeech,
}: {
  isOwnSelf?: boolean
  page?: number
  pageSize?: number
  title?: string
  start?: string
  end?: string
  creators?: number[]
  status?: string[]
  natureOfSpeech?: [string]
}) {
  const res = await request(`/leaveMessage/list`, {
    method: 'GET',
    params: {
      page,
      pageSize,
      title,
      start,
      end,
      status,
      creators,
      isOwnSelf,
      natureOfSpeech
    },
  })
  if (res) {
    return res
  }
  return false
}

export async function getCommonMessageList() {
  const res = await request(`/leaveMessage/commonList`, {
    method: 'GET',
  })
  if (res) {
    return res
  }
  return false
}
