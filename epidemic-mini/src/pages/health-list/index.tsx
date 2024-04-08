import { View } from '@tarojs/components';
import * as React from 'react';
import { AtIcon } from 'taro-ui';


export default function HealthList() {
  return (
    <View className="no-permission flex_layout">
      <AtIcon className="blocked" value="blocked"></AtIcon>
      <View className="at-article__p">health-list</View>
    </View>
  );
}
