import React from 'react'
import {
  Image,
  Button,
  Typography,
  Badge,
  Popconfirm,
} from '@arco-design/web-react'
import dayjs from 'dayjs'
import styles from './style/index.module.less'
import { deleteNotice } from '@/service/notice.service'
import { baseUrl } from '@/utils/request'

const { Text } = Typography

export const Status = {
  CLOSE: '已关闭',
  OPEN: '已发布',
  NULL: '未发布',
}

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>,
) {
  return [
    {
      title: t['menu.notice.id'],
      dataIndex: 'id',
    },
    {
      title: t['menu.notice.title'],
      dataIndex: 'title',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: t['menu.notice.image'],
      dataIndex: 'imgUrl',
      render: (value) => (
        <Image width={40} height={40} src={baseUrl + value} loader={true} />
      ),
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: t['menu.notice.createTime'],
      dataIndex: 'createAt',
      render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) =>
        dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf(),
    },
    {
      title: '编辑时间',
      dataIndex: 'editAt',
      render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => dayjs(b.editAt).valueOf() - dayjs(a.editAt).valueOf(),
    },
    {
      title: t['menu.notice.status'],
      dataIndex: 'status',
      render: (x) => {
        if (x === 'CLOSE') {
          return <Badge status="default" text={Status[x]}></Badge>
        }
        if (x === 'OPEN') {
          return <Badge status="success" text={Status[x]}></Badge>
        }
        return <Badge status="warning" text={'未发布'}></Badge>
      },
      sorter: (a, b) => b.status.localeCompare(a.status),
    },
    {
      title: t['menu.notice.action'],
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <div>
          {record.status === 'NULL' && (
            <Button
              type="text"
              size="small"
              onClick={() => callback(record, 'publish')}>
              {t['menu.notice.publish']}
            </Button>
          )}
           {record.status === 'CLOSE' && (
            <Button
              type="text"
              size="small"
              onClick={() => callback(record, 'copy')}>
              复制
            </Button>
          )}
          {record.status === 'OPEN' && (
            <Button
              type="text"
              size="small"
              onClick={() => callback(record, 'downline')}>
              下线
            </Button>
          )}

          <Popconfirm
            icon={null}
            title="确认要删除该条记录吗？"
            onOk={() => {
              callback(record, 'del')
            }}>
            <Button type="text" size="small">
              删除
            </Button>
          </Popconfirm>
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, 'view')}>
            查看详情
          </Button>
        </div>
      ),
    },
  ]
}
