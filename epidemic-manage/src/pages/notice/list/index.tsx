import React, { useState, useEffect, useMemo } from 'react'
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
  Modal,
  Descriptions,
  Message,
  Input,
  Upload,
  Form,
} from '@arco-design/web-react'
import PermissionWrapper from '@/components/PermissionWrapper'
import useLocale from '@/utils/useLocale'
import SearchForm from './form'
import locale from './locale'
import styles from './style/index.module.less'
import './mock'
import { Status, getColumns } from './constants'
import {
  createNotice,
  deleteNotice,
  editNotice,
  getNoticeList,
} from '@/service/notice.service'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import dayjs from 'dayjs'
import { useReactive } from 'ahooks'
import { baseUrl } from '@/utils/request'
import EditForm from '../create'

const { Title } = Typography
function SearchTable(props) {
  const editor = useReactive({ state: null, text: '', imgUrl: '' })
  const t = useLocale(locale)

  const handleEditorChange = (editorState) => {
    editor.state = editorState
  }

  const handleTextChange = (text) => {
    editor.text = text
  }

  const onImgChange = async (_, file) => {
    if (file.response && file.response.data && file.response.success) {
      const imgUrl = file.response.data?.imagePath
      editor.imgUrl = imgUrl
    }
  }

  const tableCallback = async (record, type) => {
    editor.text = record.title
    editor.imgUrl = record.imgUrl
    if (type === 'copy') {
      createNotice(record).then((res) => {
        if (res && res.success) {
          fetchData()
          Message.success('复制成功~')
        }
      })
    }
    if (type === 'downline' || type === 'publish') {
      editNotice({
        ...record,
        status: type === 'downline' ? 'CLOSE' : 'OPEN',
      }).then((res) => {
        if (res && res.success) {
          fetchData()
          Message.success(type === 'downline' ? '下线成功~' : '发布成功')
        }
      })
    }
    if (type === 'del') {
      deleteNotice(record.id).then((res) => {
        if (res && res.success) {
          fetchData()
        }
      })
    }
    if (type === 'view') {
      const data = [
        {
          label: '公告标题',
          value: (
            <Input
              disabled={record.status === 'CLOSE'}
              defaultValue={editor.text}
              allowClear
              placeholder="请输入公告内容"
              onChange={handleTextChange}
              style={{ width: '50%' }}
              normalize={(v) => (v ? v.trim() : v)}
            />
          ),
          span: 1,
        },
        {
          label: '公告封面',
          value: (
            <Upload
              disabled={record.status === 'CLOSE'}
              action={baseUrl + '/api/uploadImage'}
              limit={1}
              onChange={onImgChange}
              imagePreview={true}
              defaultFileList={[
                {
                  uid: record.id,
                  url: baseUrl + record.imgUrl,
                },
              ]}
              listType="picture-card"
            />
          ),
          span: 2,
        },
        {
          label: '状态',
          value: Status[record.status],
          span: 1,
        },
        {
          label: '创建时间',
          value: dayjs(record.createAt).format('YYYY-MM-DD HH:mm:ss'),
          span: 2,
        },
        {
          label: '公告内容',
        },
      ]
      Modal.info({
        icon: null,
        style: {
          width: '80%',
        },
        cancelText: '返回',
        okText: '确定更改',
        footer: (cancelButtonNode, okButtonNode) => {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              {cancelButtonNode}
              {record.status !== 'CLOSE' && okButtonNode}
            </div>
          )
        },
        okButtonProps: {
          style: {
            marginLeft: 8,
          },
        },
        onOk: () => {
          const htmlContent = editor.state?.toHTML()
          editNotice({
            ...record,
            title: editor.text,
            imgUrl: editor.imgUrl,
            content: htmlContent,
          }).then((res) => {
            if (res && res.success) {
              fetchData()
              Message.success('修改成功~')
            }
          })
        },
        content: (
          <>
            <Descriptions data={data} />
            <BraftEditor
              readOnly={record.status === 'CLOSE'}
              onChange={handleEditorChange}
              value={editor.state}
              defaultValue={BraftEditor.createEditorState(record.content)}
            />
          </>
        ),
      })
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
      isOwnSelf,
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
