import React, { useState, useEffect, useCallback } from 'react';
import {
  Badge,
  Link,
  Card,
  Radio,
  Table,
  Typography,
  Button
} from '@arco-design/web-react';
import { IconCaretDown, IconCaretUp } from '@arco-design/web-react/icon';
import request from 'axios';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/popular-contents.module.less';
import dayjs from 'dayjs'

function PopularContent() {
  const t = useLocale(locale);
  const [type, setType] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(() => {
    setLoading(true);
    request.get(`/api/workplace/popular-contents?page=${page}&pageSize=5&category=${type}`)
      .then((res) => {
        setData(res.data.list);
        setTotal(res.data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, type]);

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  const columns = [
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
      width: 120,
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

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title heading={6}>社区留言</Typography.Title>
        <Link>{t['workplace.seeMore']}</Link>
      </div>
      <Radio.Group
        type="button"
        value={type}
        onChange={setType}
        options={[
          { label: '言论偏贬', value: 0 },
          { label: '言论偏褒', value: 1 },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Table
        rowKey="rank"
        columns={columns}
        data={data}
        loading={loading}
        tableLayoutFixed
        onChange={(pagination) => {
          setPage(pagination.current);
        }}
        pagination={{ total, current: page, pageSize: 5, simple: true }}
      />
    </Card>
  );
}

export default PopularContent;
