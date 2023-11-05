import request from '@/utils/request'

export async function getNoticeList({
  page,
  pageSize,
  title,
  start,
  end,
  status
}: {
  page?: number
  pageSize?: number
  title?: string
  start?: string
  end?: string
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
    },
  })
  if (res) {
    return res
  }
  return false
}
