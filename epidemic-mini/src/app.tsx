import configStore from '@src/store';
import * as React from 'react';
import { Provider } from 'react-redux';
import 'taro-ui/dist/style/index.scss';
import './app.scss';

const store = configStore();
export default function App(props) {
  return <Provider store={store}>{props.children}</Provider>;
}
