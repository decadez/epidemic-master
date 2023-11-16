import React from 'react'
import { Carousel, Typography, Skeleton, Spin } from '@arco-design/web-react'
import { useNoticeSubscribeList } from '@/hooks'

function C() {
  const { list, loading } = useNoticeSubscribeList()

  return (
    <Skeleton
      style={{
        width: '100%',
        height: 160,
      }}
      text={{ rows: 5, width: '100%' }}
      animation
      loading={loading}>
      <Carousel
        indicatorType="slider"
        showArrow="never"
        animation="fade"
        autoPlay
        style={{
          borderRadius: 4,
          height: list?.length ? 160 : 0,
          overflow: 'hidden',
        }}>
        {list?.map((item, index) => (
          <div key={index}>
            <img
              src={item.imgUrl}
              style={{
                width: 280,
                height: '100%',
              }}
            />
            <Typography.Title
              heading={6}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                color: '#6d6161',
              }}
              ellipsis={{
                wrapper: 'span',
              }}>
              {item.title}
            </Typography.Title>
          </div>
        ))}
      </Carousel>
    </Skeleton>
  )
}

export default C
