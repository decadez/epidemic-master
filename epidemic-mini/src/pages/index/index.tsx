import * as React from "react";
import { View, Image } from "@tarojs/components";
import { AtButton, AtTabBar, AtAvatar } from "taro-ui";
import { useLaunch } from "@tarojs/taro";
import cn from "classnames";
import styles from "./index.module.scss";
import Taro from "@tarojs/taro";

interface ICustomNavBar {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  extra?: React.ReactNode;
}

function CustomNavBar({ left, middle, extra }: ICustomNavBar) {
  return (
    <View
      className={cn(
        "at-nav-bar at-nav-bar--fixed hydrated",
        styles["custom-navbar"]
      )}
    >
      <View>{left}</View>
      <View>{middle}</View>
      <View>{extra}</View>
    </View>
  );
}

function FakeInput() {
  const goSearch = () => {};
  return (
    <View onClick={goSearch} className={styles["fake-input"]}>
      <View>点击进入</View>
      <AtButton onClick={goSearch} circle type="primary" size="small">
        搜索
      </AtButton>
    </View>
  );
}

export default function Index({}: React.PropsWithChildren) {
  const [current, useCurrent] = React.useState(0);
  const isWeb = Taro.getEnv() === "WEB";
  useLaunch(() => {
    console.log("onLaunch");
  });

  const handleClick = (value) => {
    useCurrent(value);
  };

  React.useEffect(() => {
    Taro.getEnv();
  }, []);

  const goUserPage = () => {
    useCurrent(2);
  }

  const getPageConfig = (): ICustomNavBar => {
    if (current === 0) {
      return {
        left: (
          <Image
            className={styles.logo}
            src={require("../../assets/images/favicon.jpeg")}
          />
        ),
        middle: <FakeInput />,
        extra: (
          <Image
            onClick={goUserPage}
            className={styles.avatar}
            src={require("../../assets/images/favicon.jpeg")}
          />
        ),
      };
    }
    if (current === 1) {
      return {
        middle: "附近采样点",
      };
    }
    return {
      middle: "个人中心",
    };
  };

  const getNavBar = () => {
    if (isWeb) {
      return <CustomNavBar {...getPageConfig()} />;
    }
  };

  return (
    <View className={cn(styles.container)}>
      {getNavBar()}
      <AtTabBar
        fixed
        backgroundColor="#ececec8a"
        color="#d7c15d"
        selectedColor="#e88761f0"
        tabList={[
          { title: "首页", iconType: "home", text: "new" },
          { title: "附近采样点", iconType: "map-pin" },
          { title: "个人中心", iconType: "user", text: "100", max: 99 },
        ]}
        onClick={handleClick}
        current={current}
      />
    </View>
  );
}
