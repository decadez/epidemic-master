import React from 'react';
import { Button, Typography, Badge } from '@arco-design/web-react';
import dayjs from 'dayjs';
import styles from './style/index.module.less';

const { Text } = Typography;

export const Status = ['未发布', '已发布', '已下线'];

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: t['menu.notice.id'],
      dataIndex: 'id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: t['menu.notice.title'],
      dataIndex: 'name',
    },
    {
      title: t['menu.notice.creator'],
      dataIndex: 'creator',
    },
    {
      title: t['menu.notice.image'],
      dataIndex: 'image',
      render: (value) => <div className={styles['image']}>{value}</div>,
    },
    {
      title: t['menu.notice.createTime'],
      dataIndex: 'createTime',
      render: (x) => dayjs().subtract(x, 'days').format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => b.createTime - a.createTime,
    },
    {
      title: t['menu.notice.status'],
      dataIndex: 'status',
      render: (x) => {
        if (x === 0) {
          return <Badge status="warning" text={Status[x]}></Badge>;
        }
        if (x === 1) {
          return <Badge status="success" text={Status[x]}></Badge>;
        }
        return <Badge status="default" text={Status[x]}></Badge>;
      },
    },
    {
      title: t['menu.notice.action'],
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Button
          type="text"
          size="small"
          onClick={() => callback(record, 'view')}
        >
          {t['menu.notice.publish']}
        </Button>
      ),
    },
  ];
}
