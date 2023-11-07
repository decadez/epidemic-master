import React, { useState, useEffect, useMemo } from 'react'
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
} from '@arco-design/web-react'
import PermissionWrapper from '@/components/PermissionWrapper'
import useLocale from '@/utils/useLocale'
import SearchForm from './form'
import locale from './locale'
import styles from './style/index.module.less'
import './mock'
import { getColumns } from './constants'
import { deleteNotice, getNoticeList } from '@/service/notice.service'

const { Title } = Typography
export const ContentType = ['图文', '横版短视频', '竖版短视频']
export const FilterType = ['规则筛选', '人工']

function SearchTable(props) {
  const t = useLocale(locale)

  const tableCallback = async (record, type) => {
    console.log(record, type)
    if (type === 'publish') {
      console.log('edit')
    }
    if (type === 'del') {
      fetchData();
    }
    if (type === 'view') {
      console.log('view')
    }
  }

  const columns = useMemo(() => getColumns(t, tableCallback), [t])

  const [data, setData] = useState([])
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  })
  const [loading, setLoading] = useState(true)
  const [formParams, setFormParams] = useState<{
    createAt?: [string, string]
    title?: string
    status?: string[]
    creators?: number[]
    isOwnSelf?: boolean
  }>({})

  useEffect(() => {
    fetchData()
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)])

  const fetchData = async () => {
    const { current, pageSize } = pagination
    const { title, createAt, status, creators, isOwnSelf } = formParams
    setLoading(true)
    const res = await getNoticeList({
      page: current,
      pageSize,
      title,
      start: createAt?.[0],
      end: createAt?.[1],
      creators,
      status,
      isOwnSelf
    })
    setData(res.data?.list)
    setPatination({
      ...pagination,
      current,
      pageSize,
      total: res.data?.total,
    })
    setLoading(false)
  }

  function onChangeTable({ current, pageSize }) {
    setPatination({
      ...pagination,
      current,
      pageSize,
    })
  }

  function handleSearch(params) {
    setPatination({ ...pagination, current: 1 })
    setFormParams(params)
  }

  const goCreate = () => {
    props.history.replace('/notice/create')
  }

  return (
    <Card>
      <Title heading={6}>{t['menu.notice.list']}</Title>
      <SearchForm data={data} onSearch={handleSearch} />
      <div className={styles['button-group']}>
        <Space>
          <Button type="primary" onClick={goCreate}>
            {t['menu.notice.create']}{' '}
          </Button>
        </Space>
      </div>
      <PermissionWrapper
        requiredPermissions={[
          { resource: 'menu.list.searchTable', actions: ['write'] },
        ]}></PermissionWrapper>
      <Table
        rowKey="id"
        loading={loading}
        onChange={onChangeTable}
        pagination={pagination}
        columns={columns}
        data={data}
      />
    </Card>
  )
}

export default SearchTable
