import React, { useState, useEffect } from 'react'
import request from 'axios'
import { Link, Card, Skeleton, Tag, Typography } from '@arco-design/web-react'
import useLocale from '@/utils/useLocale'
import locale from './locale'
import styles from './style/announcement.module.less'
import { useRequest } from 'ahooks'
import { getNoticeList } from '@/service/notice.service'

export const Status = {
  CLOSE: '已关闭',
  OPEN: '已发布',
  NULL: '未发布',
}

function Announcement() {
  const {
    data = { data: { list: [] } },
    run,
    loading,
  } = useRequest(getNoticeList, {
    manual: true,
  })

  const t = useLocale(locale)
  function getTagColor(type) {
    switch (type) {
      case 'OPEN':
        return 'orangered'
      case 'CLOSE':
        return 'cyan'
      case 'NULL':
        return 'arcoblue'
      default:
        return 'arcoblue'
    }
  }

  React.useEffect(() => {
    run({
      page: 1,
      pageSize: 5,
    })
  }, [])

  return data.data.list?.length ? (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Typography.Title heading={6}>
          {t['workplace.announcement']}
        </Typography.Title>
        <Link href={'/notice/list'}>{t['workplace.seeMore']}</Link>
      </div>
      <Skeleton loading={loading} text={{ rows: 5, width: '100%' }} animation>
        <div>
          {data.data.list?.map((item, index) => (
            <div key={String(index)} className={styles.item}>
              <Tag color={getTagColor(item?.status)} size="small">
                {Status[item?.status]}
              </Tag>
              <span className={styles.link}>{item?.title}</span>
            </div>
          ))}
        </div>
      </Skeleton>
    </Card>
  ) : null
}

export default Announcement
