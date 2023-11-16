import request from '@/utils/request'

export async function uploadImage(image: File) {
  const fileData = new FormData;
  fileData.append('img', image);

  const res = await request(`/uploadImage`, {
    method: 'POST',
    body: JSON.stringify({ image: fileData }),
  })
  if (res) {
    return res
  }
  return false
}

export async function getMetaTableNames() {
  const res = await request(`/meta/tableNames`, {
    method: 'GET',
  })
  if (res) {
    return res
  }
  return false
}

export async function getMetaTableList(
  tableName: string,
  pagination: {
    page: number
    size: number
  },
) {
  const res = await request(`/meta/tableData`, {
    method: 'POST',
    params: {
      tableName,
      pagination,
    },
  })
  if (res) {
    return res
  }
  return false
}
