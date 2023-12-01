import { View } from '@tarojs/components';
import * as React from 'react';
import BaseLayout from '@src/layouts/BaseLayout';
import { AtCalendar } from "taro-ui"
import { Swiper, SwiperItem } from '@tarojs/components'

export default function Home() {
  return (
    <BaseLayout>
      <Swiper
        className='home-swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay>
        <SwiperItem className='home-swiper-item'>
          <View className='demo-text-1'>1</View>
        </SwiperItem>
        <SwiperItem className='home-swiper-item'>
          <View className='demo-text-2'>2</View>
        </SwiperItem>
        <SwiperItem className='home-swiper-item'>
          <View className='demo-text-3'>3</View>
        </SwiperItem>
      </Swiper>
      <AtCalendar />
    </BaseLayout>
  );
}
