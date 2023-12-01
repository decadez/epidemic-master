import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import cn from 'classnames';
import * as React from 'react';
import { AtTabBar } from 'taro-ui';
import './index.scss';

interface ICustomNavBar {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  extra?: React.ReactNode;
}

function CustomNavBar({ left, middle, extra }: ICustomNavBar) {
  return (
    <View className={cn('at-nav-bar at-nav-bar--fixed hydrated custom-navbar')}>
      <View>{left}</View>
      <View>{middle}</View>
      <View>{extra}</View>
    </View>
  );
}

const routesMap = {
  0: {
    path: '/pages/home',
    icon: 'home',
    text: '社区疫防',
  },
  1: {
    path: '/pages/health',
    icon: 'heart',
    text: '健康打卡',
  },
  2: {
    path: '/pages/feedback',
    icon: 'message',
    text: '留言反馈',
  },
  3: {
    path: '/pages/user',
    icon: 'user',
    text: '个人中心',
  },
};

type BaseLayoutProps = {
  hideNav?: boolean;
  children: React.ReactNode;
}

export default function BaseLayout({ children, hideNav = false }: React.PropsWithChildren & BaseLayoutProps) {
  const { path } = useRouter();

  const routesMapValues = Object.values(routesMap);
  let current = 0;

  routesMapValues.forEach((item, index) => {
    if (new RegExp(item.path).test(path)) {
      current = index;
    }
  });

  const isWeb = Taro.getEnv() === 'WEB';

  const handleClick = (value) => {
    Taro.redirectTo({
      url: routesMap[value].path,
    });
  };

  React.useEffect(() => {
    Taro.getEnv();
  }, []);

  const getPageConfig = (): ICustomNavBar => {
    return {
      middle: routesMap[current].text,
    };
  };

  const getNavBar = () => {
    if (isWeb) {
      return <CustomNavBar {...getPageConfig()} />;
    }
  };

  return (
    <View className="container">
      {!hideNav && getNavBar()}
      <View className='content'>{children}</View>
      <AtTabBar
        fixed
        backgroundColor="#ececec8"
        color="rgb(134, 144, 156, 1)"
        selectedColor="rgba(22, 93, 255, 1)"
        tabList={Object.keys(routesMap).map((key) => {
          return {
            title: routesMap[key].text,
            iconType: routesMap[key].icon,
          };
        })}
        onClick={handleClick}
        current={current}
      />
    </View>
  );
}
