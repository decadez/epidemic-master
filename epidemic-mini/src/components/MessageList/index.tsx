import { View } from '@tarojs/components';
import * as React from 'react';
import { AtIcon } from 'taro-ui';

export default function MessageList(props: any) {
  const data = [
    {
      title: '请问社区的核酸在哪号门做，具体什么时间开始呢？我下班可能没时间~',
      content: '消息内容',
      status: '已回复',
    },
    {
      title: '请问社区的核酸在哪号门做，具体什么时间开始呢？我下班可能没时间~',
      content: '消息内容',
      status: '未回复',
    },
    {
      title: '请问社区的核酸在哪号门做，具体什么时间开始呢？我下班可能没时间~',
      content: '消息内容',
      status: '未回复',
    },
  ];

  React.useEffect(() => {}, []);
  return (
    <View className="message-list flex_layout">
      <View className="message-label flex_layout">
        <View className="message-label-left">留言列表</View>
        <View className='message-label-right'>查看更多<AtIcon value={'chevron-right'}/></View>
      </View>
      <View className="message-list-content">
        {data?.map((item, key) => {
          return (
            <View key={String(key)} className="message-item flex_layout">
              <View className={`message-item-status ${item.status === '未回复' && 'message-item-status-unreply'}`}>{item.status}</View>
              <View className="message-item-title">{item.title}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
