import MessageList from '@components/MessageList';
import type { NoticePartialDTO } from '@service/notice.service';
import { getCommonNoticeList } from '@service/notice.service';
import { getUserInfo, wxLogin } from '@service/user.service';
import BaseLayout from '@src/layouts/BaseLayout';
import {
  Empty,
  NoticeBar,
  Skeleton,
  Swiper as TaroifySwiper,
} from '@taroify/core';
import { VolumeOutlined } from '@taroify/icons';
import { Image, Swiper, SwiperItem } from '@tarojs/components';
import { useRequest } from 'ahooks';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AtCalendar, AtModal } from 'taro-ui';
import { history } from '@tarojs/router';
import Taro from '@tarojs/taro';

export default function Home() {
  const { data, loading, run } = useRequest(getCommonNoticeList, {
    manual: true,
  });
  const [visible, setVisible] = React.useState(false);
  const [record, setRecord] = React.useState<NoticePartialDTO>({});
  const dispatch = useDispatch();
  const { user } = useSelector(state => state);

  const checkUser = async () => {
    const loginData = await wxLogin();
    localStorage.setItem('token', loginData?.token);
    const userData = await getUserInfo();
    dispatch({
      type: 'SET_USER_INFO',
      payload: userData
    })
    history.listen((listener) => {
      if (
        !loginData?.token &&
        !/(pages\/no-permission)/.test(listener.location.pathname)
      ) {
        Taro.redirectTo({
          url: '/pages/no-permission',
        });
      }
    });
  };

  React.useEffect(() => {
    run();
    if (!user.isLogin) {
      checkUser();
    }
  }, []);

  const showDetail = (item: any) => {
    setRecord(item);
    setVisible(true);
  };

  const headerRender = () => {
    if (loading) {
      return <Skeleton animation="wave" />;
    }

    if (data && data?.length) {
      return (
        <>
          <NoticeBar>
            <NoticeBar.Icon>
              <VolumeOutlined />
            </NoticeBar.Icon>
            <TaroifySwiper
              className="notice-swiper"
              direction="vertical"
              autoplay={3000}>
              {data.map((item) => (
                <TaroifySwiper.Item>{item.title}</TaroifySwiper.Item>
              ))}
            </TaroifySwiper>
          </NoticeBar>
          <Swiper
            className="home-swiper"
            indicatorColor="#999"
            indicatorActiveColor="#333"
            circular
            indicatorDots
            autoplay>
            {data &&
              data?.map((item, key) => (
                <SwiperItem
                  onClick={() => {
                    showDetail(item);
                  }}
                  key={String(key)}
                  className="home-swiper-item">
                  <Image src={item.imgUrl} />
                </SwiperItem>
              ))}
          </Swiper>
        </>
      );
    }

    return (
      <Swiper
        className="home-swiper"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        autoplay>
        <SwiperItem className="home-swiper-item">
          <Empty>
            <Empty.Image className="custom-empty__image"/>
            <Empty.Description className='custom-empty__dec'>暂无公告</Empty.Description>
          </Empty>
        </SwiperItem>
      </Swiper>
    );
  };

  return (
    <BaseLayout>
      {headerRender()}
      <MessageList />
      <AtCalendar marks={ [ { value: '2018/11/11' } ]} className="bg-white border-radius-10" />
      <AtModal
        isOpened={visible}
        title={record?.title}
        cancelText={''}
        confirmText="确认"
        onConfirm={() => setVisible(false)}
        content={record?.content}
      />
    </BaseLayout>
  );
}
