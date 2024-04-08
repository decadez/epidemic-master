import { View } from '@tarojs/components';
import * as React from 'react';
import { AtIcon } from 'taro-ui';

export default function TksPage() {
  React.useEffect(() => {}, []);
  return (
    <View className="message-list flex_layout">
      <AtIcon className="check-good" value="check"></AtIcon>
      <View className="at-article__p">
        感谢反馈，稍后请至『个人中心』 -{`>`}『我的留言』查看结果
      </View>
    </View>
  );
}
