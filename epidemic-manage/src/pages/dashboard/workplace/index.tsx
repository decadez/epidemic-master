import React, { useEffect, useState } from 'react'
import { Grid, Space } from '@arco-design/web-react'
import Overview from './overview'
import PopularContents from './popular-contents'
import ContentPercentage from './content-percentage'
import Shortcuts from './shortcuts'
import Announcement from './announcement'
import Carousel from './carousel'
import styles from './style/index.module.less'
import MessageList from '@/pages/message/list';
import './mock'

const { Row, Col } = Grid

const gutter = 16

function Workplace() {
  return (
    <div className={styles.wrapper}>
      <Space size={16} direction="vertical" className={styles.left}>
        <Overview />
        <Row gutter={gutter}>
          <Col span={12}>
            <MessageList hideSearch title="社区留言"/>
          </Col>
          <Col span={12}>
            <ContentPercentage />
          </Col>
        </Row>
      </Space>
      <Space className={styles.right} size={16} direction="vertical">
        <Shortcuts />
        <Carousel />
        <Announcement />
      </Space>
    </div>
  )
}

export default Workplace
