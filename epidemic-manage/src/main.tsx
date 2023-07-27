import './style/global.less';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageLayout from './layout';
import { GlobalContext } from './context';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
import './mock';
import { store, persistor } from '@/store';
import { Message, Icon } from '@arco-design/web-react';
import { fetchUserInfo, initUserStore } from '@/store/reducer/userSlice';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useHistory } from 'react-router-dom';

const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/font_180975_26f1p759rvn.js',
});

function Index() {
  const [lang, setLang] = useStorage('lang', 'zh-CN');
  const [theme, setTheme] = useStorage('theme', 'light');
  const [status, setUserStatus] = useStorage('userStatus');
  const history = useHistory();
  
  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  function logout() {
    setUserStatus('logout');
    window.location.href = "/login";
    store.dispatch(initUserStore());
  }

  function fetchUser() {
    store.dispatch(fetchUserInfo()).catch(() => {
      logout();
      Message.error({
        icon: <IconFont type='icon-error' />,
        content: '"登陆失败，请稍后再试～"',
      })
    })
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUser();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, [status]);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={getArcoLocale()}
        componentConfig={{
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          Table: {
            border: false,
          },
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalContext.Provider value={contextValue}>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={PageLayout} />
              </Switch>
            </GlobalContext.Provider>
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
