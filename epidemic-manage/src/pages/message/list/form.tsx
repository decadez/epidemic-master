import React, { useContext } from 'react';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Grid,
  Radio,
} from '@arco-design/web-react';
import { GlobalContext } from '@/context';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { NatureOfSpeech, Status } from './constants';
import styles from './style/index.module.less';

const { Row, Col } = Grid;
const { useForm } = Form;

function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void;
}) {
  const { lang } = useContext(GlobalContext);

  const t = useLocale(locale);
  const [form] = useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    props.onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch({});
  };

  const colSpan = lang === 'zh-CN' ? 8 : 12;

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item label="留言标题" field="title">
              <Input
                allowClear
                placeholder={t['menu.notice.title.placeholder']}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['menu.notice.createTime']} field="createAt">
              <DatePicker.RangePicker
                allowClear
                style={{ width: '100%' }}
                disabledDate={(date) => dayjs(date).isAfter(dayjs())}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['menu.notice.status']} field="status">
              <Select
                placeholder={t['menu.notice.status.placeholder']}
                options={Object.keys(Status).map((item) => ({
                  label: Status[item],
                  value: item,
                }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label='言论性质' field="natureOfSpeech">
              <Radio.Group
                type="button"
                options={Object.keys(NatureOfSpeech).map((item) => ({
                  label: NatureOfSpeech[item],
                  value: item,
                }))}
                style={{ marginBottom: 16 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<IconSearch />} onClick={handleSubmit}>
          {t['menu.notice.search']}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {t['menu.notice.reset']}
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
