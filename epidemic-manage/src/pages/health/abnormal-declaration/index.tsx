import React, { useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  InputTag,
  Button,
  Typography,
  Space,
  Card,
  Switch,
  Result,
  Radio,
} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';

const { Title, Paragraph } = Typography;
function Health() {
  const t = useLocale(locale);
  const [current, setCurrent] = useState(1);

  const [form] = Form.useForm();

  const viewForm = () => {
    const values = form.getFields();
    form.setFields(values);
    setCurrent(1);
  };

  const reCreateForm = () => {
    form.resetFields();
    setCurrent(1);
  };

  const toNext = async () => {
    try {
      await form.validate();
      setCurrent(current + 1);
    } catch (_) {}
  };
  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.wrapper}>
          <Steps current={current} lineless>
            <Steps.Step title="个人信息" />
            <Steps.Step title="打卡信息" />
            <Steps.Step
              title={t['stepForm.title.created']}
              description={t['stepForm.desc.created']}
            />
          </Steps>
          <Form form={form} className={styles.form}>
            {current === 1 && (
              <Form.Item noStyle>
                <Form.Item
                  label="打卡人"
                  required
                  field="basic.name"
                  rules={[
                    {
                      required: true,
                      message: t['stepForm.basicInfo.name.required'],
                    },
                    {
                      validator: (value: string, callback) => {
                        if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/g.test(value)) {
                          callback(t['stepForm.basicInfo.name.placeholder']);
                        }
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder={t['stepForm.basicInfo.name.placeholder']}
                  />
                </Form.Item>
                <Form.Item
                  label="打卡时间"
                  required
                  field="basic.time"
                  rules={[
                    {
                      required: true,
                      message: t['stepForm.basicInfo.time.required'],
                    },
                  ]}
                >
                  <DatePicker showTime style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label="联系方式"
                  required
                  field="basic.link"
                  initialValue="1300000000"
                  rules={[{ required: true, message: '联系方式必填' }]}
                >
                  <Input placeholder="请输入手机号" />
                </Form.Item>
              </Form.Item>
            )}
            {current === 2 && (
              <Form.Item noStyle>
                <Form.Item
                  label="所在城市"
                  required
                  field="channel.source"
                  rules={[
                    {
                      required: true,
                      message: '请选择所在城市',
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="0">上海</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="健康码状态"
                  required
                  field="channel.media"
                  rules={[
                    {
                      required: true,
                      message: '请选择健康码状态',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="0">绿码</Radio>
                    <Radio value="1">红码</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="是否接种疫苗"
                  required
                  field="channel.content"
                  rules={[
                    {
                      required: true,
                      message: t['stepForm.channel.content.required'],
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="0">是</Radio>
                    <Radio value="1">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="其他"
                  required
                  field="channel.is"
                  rules={[
                    {
                      required: true,
                      message: t['stepForm.channel.content.required'],
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder={t['stepForm.channel.content.placeholder']}
                  />
                </Form.Item>
              </Form.Item>
            )}
            {current !== 3 ? (
              <Form.Item label=" ">
                <Space>
                  {current === 2 && (
                    <Button
                      size="large"
                      onClick={() => setCurrent(current - 1)}
                    >
                      {t['stepForm.prev']}
                    </Button>
                  )}
                  {current !== 3 && (
                    <Button type="primary" size="large" onClick={toNext}>
                      {t['stepForm.next']}
                    </Button>
                  )}
                </Space>
              </Form.Item>
            ) : (
              <Form.Item noStyle>
                <Result
                  status="success"
                  title={t['stepForm.created.success.title']}
                  subTitle={t['stepForm.created.success.desc']}
                  extra={[
                    <Button
                      key="reset"
                      style={{ marginRight: 16 }}
                      onClick={viewForm}
                    >
                      {t['stepForm.created.success.view']}
                    </Button>,
                    <Button key="again" type="primary" onClick={reCreateForm}>
                      查看历史提交
                    </Button>,
                  ]}
                />
              </Form.Item>
            )}
          </Form>
        </div>
      </Card>
    </div>
  );
}

export default Health;
