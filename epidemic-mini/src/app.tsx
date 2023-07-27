import * as React from "react";
import { Provider } from "react-redux";
import configStore from "./store";
import "taro-ui/dist/style/index.scss";
import "./app.scss";
const store = configStore();

export default function App(props) {
  React.useEffect(() => {});

  return <Provider store={store}>{props.children}</Provider>;
}
