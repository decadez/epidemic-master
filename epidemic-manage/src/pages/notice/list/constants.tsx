import React from 'react'
import { Button, Typography, Badge } from '@arco-design/web-react'
import dayjs from 'dayjs'
import styles from './style/index.module.less'

const { Text } = Typography

export const Status = {
  CLOSE: "已关闭",
  OPEN: "已发布",
  NULL: "未发布",
}

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>,
) {
  return [
    {
      title: t['menu.notice.id'],
      dataIndex: 'id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: t['menu.notice.title'],
      dataIndex: 'title',
    },
    {
      title: t['menu.notice.image'],
      dataIndex: 'imgUrl',
      render: (value) => <div className={styles['image']}>{value}</div>,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: t['menu.notice.createTime'],
      dataIndex: 'createAt',
      render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf(),
    },
    {
      title: "编辑时间",
      dataIndex: 'editAt',
      render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => dayjs(b.editAt).valueOf() - dayjs(a.editAt).valueOf(),
    },
    {
      title: t['menu.notice.status'],
      dataIndex: 'status',
      render: (x) => {
        if (x === "CLOSE") {
          return <Badge status="default" text={Status[x]}></Badge>
        }
        if (x === "OPEN") {
          return <Badge status="success" text={Status[x]}></Badge>
        }
        return <Badge status="warning" text={"未发布"}></Badge> 
      },
    },
    {
      title: t['menu.notice.action'],
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <div>
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, 'view')}>
            {t['menu.notice.publish']}
          </Button>
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
