import React from 'react'
import { Carousel, Spin } from '@arco-design/web-react'
import useLocale from '@/utils/useLocale'
import locale from './locale'
import styles from './style/index.module.less'
import { baseUrl } from '@/utils/request'
import { useNoticeSubscribeList } from '@/hooks'
export default function LoginBanner() {
  const t = useLocale(locale)
  const { list, loading } = useNoticeSubscribeList()

  return (
    <Carousel className={styles.carousel} animation="fade">
      {list?.map((item, index) => (
        <div key={`${index}`}>
          <div className={styles['carousel-item']}>
            <div className={styles['carousel-title']}>{item.title}</div>
            {/* <BraftEditor controlBarStyle={{
              display: 'none',
            }} defaultValue={item.content} readOnly /> */}
            <img
              alt="banner-image"
              className={styles['carousel-image']}
              src={baseUrl + item.imgUrl}
            />
          </div>
        </div>
      ))}
    </Carousel>
  )
}
