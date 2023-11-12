import request from '@/utils/request'

export async function editNotice(notice: any) {
  const res = await request(`/notice/edit`, {
    method: 'POST',
    data: notice,
  })
  if (res) {
    return res
  }
  return false
}
export async function publishNotice(notice: any) {
  const res = await request(`/notice/publish`, {
    method: 'POST',
    data: notice,
  })
  if (res) {
    return res
  }
  return false
}

export async function deleteNotice(id: number) {
  const res = await request(`/notice/delete`, {
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
export async function createNotice({
  imgUrl,
  title,
  content,
}: {
  imgUrl: string
  title: string
  content: string
}) {
  const res = await request(`/notice/create`, {
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

export async function getNoticeList({
  page,
  pageSize,
  title,
  start,
  end,
  status,
  creators,
  isOwnSelf,
}: {
  isOwnSelf?: boolean
  page?: number
  pageSize?: number
  title?: string
  start?: string
  end?: string
  creators?: number[]
  status?: string[]
}) {
  const res = await request(`/notice/list`, {
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
    },
  })
  if (res) {
    return res
  }
  return false
}

export async function getCommonNoticeList() {
  const res = await request(`/notice/commonList`, {
    method: 'GET',
  })
  if (res) {
    return res
  }
  return false
}
