import BaseLayout from '@src/layouts/BaseLayout';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { AtAvatar, AtList, AtListItem } from 'taro-ui';

export default function User() {
  const { user } = useSelector((state) => state);

  return (
    <BaseLayout hideNav>
      <View className="user-header">
        <View className="user-bg" />
        <View className="user-info flex_layout">
          <AtAvatar circle image={user.avatar}></AtAvatar>
          <View className="at-article__info">@{user.username}</View>
          <View className="at-article__h3">{user.name}</View>
        </View>
      </View>

      <AtList hasBorder={false} className="bg-transparent m-t-250">
        <AtListItem
          onClick={() => {
            Taro.redirectTo({
              url: '/pages/health-list',
            });
          }}
          iconInfo={{
            className: 'user-setting-item',
            size: 25,
            color: 'rgba(0, 0, 0, 1)',
            value: 'heart',
          }}
          title="我的健康打卡"
          arrow="right"
        />
        <AtListItem
          onClick={() => {
            Taro.redirectTo({
              url: '/pages/feedback-list',
            });
          }}
          iconInfo={{
            className: 'user-setting-item',
            size: 25,
            color: 'rgba(0, 0, 0, 1)',
            value: 'message',
          }}
          title="我的留言"
          arrow="right"
        />
      </AtList>
    </BaseLayout>
  );
}
