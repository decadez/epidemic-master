import { Badge, Button, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';

const { Text } = Typography;

export enum Status {
  NULL = '未回复',
  REPLIED = '已回复',
}

export enum NatureOfSpeech {
  WAITING = '分析中',
  GOOD = '言论偏褒',
  BAD = '言论偏贬',
}

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>,
) {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
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
      title: '言论性质',
      dataIndex: 'natureOfSpeech',
      width: 100,
      render: (x) => {
        if ("GOOD" === x as keyof typeof NatureOfSpeech) {
          return <Badge status="success" text={NatureOfSpeech[x]}></Badge>;
        }
        if ("BAD" === x as keyof typeof NatureOfSpeech) {
          return <Badge status="error" text={NatureOfSpeech[x]}></Badge>;
        }
        return <Badge status="processing" text={NatureOfSpeech[x] || '分析中'}></Badge>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (x) => {
        if ("NULL" === x as keyof typeof Status) {
          return <Badge status="default" text={Status[x]}></Badge>;
        }
        return <Badge status="success" text={Status[x]}></Badge>;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Button type="text" size="small">
          查看对话
        </Button>
      ),
    },
  ];
}
