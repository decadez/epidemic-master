import {
  Form,
  Input,
  Checkbox,
  Link,
  Button,
  Space,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import request from 'axios';
import { useLocalStorageState } from 'ahooks';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { login } from '@/service/user.service';
import { getToken } from '@/store/reducer/userSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams] = useLocalStorageState('userInfo');
  const dispatch = useAppDispatch();
  const history = useHistory();
  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);
  function afterLoginSuccess(params) {
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      setLoginParams();
    }
    window.location.href = '/';
  }

  function onSubmitClick() {
    setErrorMessage('');
    setLoading(true);
    formRef.current.validate().then((values) => {
      dispatch(getToken(values))
        .then((res) => {
          if (!isEmpty(res?.payload)) {
            afterLoginSuccess(values);
          } else {
            setErrorMessage(t['login.form.login.errMsg']);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-sub-title']}>
        简洁，高效，美观
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        <Form.Item
          field="username"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
