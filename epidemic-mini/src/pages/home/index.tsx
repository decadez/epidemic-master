import MessageList from '@components/MessageList';
import { getCommonNoticeList } from '@service/notice.service';
import BaseLayout from '@src/layouts/BaseLayout';
import { Image, Swiper, SwiperItem, View } from '@tarojs/components';
import { useRequest } from 'ahooks';
import * as React from 'react';
import { AtCalendar, AtModal, AtNoticebar } from 'taro-ui';

export default function Home() {
  const { data, loading, run } = useRequest(getCommonNoticeList, {
    manual: true,
  });
  const [visible, setVisible] = React.useState(false);
  const [record, setRecord] = React.useState(null);

  React.useEffect(() => {
    run();
  }, []);

  const showDetail = (item: any) => {
    setRecord(item);
    setVisible(true);
  };

  return (
    <BaseLayout>
      <Swiper
        className="home-swiper"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay>
        {data?.map((item, index) => (
          <SwiperItem
            onClick={() => {
              showDetail(item);
            }}
            key={index}
            className="home-swiper-item">
            <AtNoticebar icon="volume-plus">{item.title}</AtNoticebar>
            <Image src={item.imgUrl} />
          </SwiperItem>
        ))}
      </Swiper>
      <MessageList />
      <AtCalendar className="bg-white border-radius-10" />
      <AtModal
        isOpened={visible}
        title={record?.title}
        cancelText="取消"
        confirmText="确认"
        onCancel={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
        content={record?.content}
      />
    </BaseLayout>
  );
}
