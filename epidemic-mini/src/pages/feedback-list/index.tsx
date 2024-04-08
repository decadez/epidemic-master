import { View } from '@tarojs/components';
import * as React from 'react';
import { AtIcon } from 'taro-ui';


export default function FeedbackList() {
  return (
    <View className="no-permission flex_layout">
      <AtIcon className="blocked" value="blocked"></AtIcon>
      <View className="at-article__p">feedback-list</View>
    </View>
  );
}
