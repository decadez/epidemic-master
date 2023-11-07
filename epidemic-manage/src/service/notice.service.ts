import request from '@/utils/request'

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
