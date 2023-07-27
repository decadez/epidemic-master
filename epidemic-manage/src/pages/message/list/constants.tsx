import React from 'react';
import { Button, Typography, Badge } from '@arco-design/web-react';
import dayjs from 'dayjs';
import styles from './style/index.module.less';

const { Text } = Typography;

export const Status = ['未回复', '已回复'];

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '序号',
      dataIndex: 'rank',
      width: 65,
    },
    {
      title: '留言标题',
      dataIndex: 'title',
      render: (x) => (
        <Typography.Paragraph style={{ margin: 0 }} ellipsis>
          {x}
        </Typography.Paragraph>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (x) => dayjs().subtract(x, 'days').format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => b.createTime - a.createTime,
    },
    {
      title: '状态',
      dataIndex: 'pv',
      width: 100,
      render: (x) => {
        if (x === 0) {
          return <Badge status="warning" text="未回复"></Badge>;
        }
        return <Badge status="success" text="已回复"></Badge>;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Button
          type="text"
          size="small"
        >
          查看对话
        </Button>
      ),
    },
  ];
}
