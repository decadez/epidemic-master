import * as React from "react";
import { View, Image } from "@tarojs/components";
import { AtButton, AtTabBar, AtAvatar } from "taro-ui";
import { useLaunch } from "@tarojs/taro";
import cn from "classnames";
import styles from "./index.module.scss";
import Taro from "@tarojs/taro";

export default function User({}: React.PropsWithChildren) {
  const isWeb = Taro.getEnv() === "WEB";

  return <View className={cn(styles.container)}>user</View>;
}
