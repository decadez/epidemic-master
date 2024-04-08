import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Link,
  Typography,
} from '@arco-design/web-react';
import PermissionWrapper from '@/components/PermissionWrapper';
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import { getColumns } from './constants';
import { getMessageList } from '@/service/messageLeave.service';

const { Title } = Typography;
export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['已上线', '未上线'];

interface ISearchTable {
  hideSearch?: boolean;
  title?: React.ReactNode;
  href?: string;
}

function SearchTable(props: ISearchTable) {
  const t = useLocale(locale);

  const tableCallback = async (record, type) => {
    console.log(record, type);
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  const [data, setData] = useState([]);
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState<{
    createAt?: [string, string]
    title?: string
    status?: string[]
    creators?: number[]
    isOwnSelf?: boolean
    natureOfSpeech?: string
  }>({});

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)]);

  async function fetchData() {
    const { current, pageSize } = pagination;
    const { title, createAt, status, creators, isOwnSelf, natureOfSpeech } = formParams
    setLoading(true);
    const res = await getMessageList({
      page: current,
      pageSize,
      title,
      natureOfSpeech: [natureOfSpeech],
      start: createAt?.[0],
      end: createAt?.[1],
      creators,
      status,
      isOwnSelf,
    })
    setData(res.data?.list);
    setPatination({
      ...pagination,
      current,
      pageSize,
      total: res.data?.total,
    });
    setLoading(false);
  }

  function onChangeTable({ current, pageSize }) {
    setPatination({
      ...pagination,
      current,
      pageSize,
    });
  }

  function handleSearch(params) {
    setPatination({ ...pagination, current: 1 });
    setFormParams(params);
  }

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Title heading={6}>{props.title || '留言列表'}</Title>
        <Link href={'/message/list'}>查看更多</Link>
      </div>
      {!props.hideSearch && <SearchForm onSearch={handleSearch} />}
      <PermissionWrapper
        requiredPermissions={[
          { resource: 'menu.list.searchTable', actions: ['write'] },
        ]}
      ></PermissionWrapper>
      <Table
        rowKey="id"
        loading={loading}
        onChange={onChangeTable}
        pagination={pagination}
        columns={columns}
        data={data}
      />
    </Card>
  );
}

export default SearchTable;
