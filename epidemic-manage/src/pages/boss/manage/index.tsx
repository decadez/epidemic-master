import React from 'React'
import { Table, Card, Typography } from '@arco-design/web-react'
import PermissionWrapper from '@/components/PermissionWrapper'
type Props = {}

export default function Manage({}: Props) {
  
  return (
    <Card>
      <Typography.Title heading={6}>全表管理</Typography.Title>
      <PermissionWrapper
        requiredPermissions={[
          { resource: 'menu.list.manage', actions: ['write'] },
        ]} />
      {/* <Table
        rowKey="id"
        loading={loading}
        onChange={onChangeTable}
        pagination={pagination}
        columns={columns}
        data={data}
      /> */}
    </Card>
  )
}
