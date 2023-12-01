import BaseLayout from '@src/layouts/BaseLayout';
import { View } from '@tarojs/components';
import * as React from 'react';
import { AtAvatar, AtList, AtListItem } from 'taro-ui';

export default function User() {
  return (
    <BaseLayout hideNav>
      <View className="user-header">
        <View className="user-bg" />
        <View className="user-info flex_layout">
          <AtAvatar circle text="decadez"></AtAvatar>
          <View className="at-article__info">@decadez</View>
          <View className="at-article__h3">decadez</View>
        </View>
      </View>

      <AtList hasBorder={false} className="bg-transparent m-t-250">
        <AtListItem
          iconInfo={{
            className: 'user-setting-item',
            size: 25,
            color: 'rgba(0, 0, 0, 1)',
            value: 'user',
          }}
          title="我的资料"
          arrow="right"
        />
        <AtListItem
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
