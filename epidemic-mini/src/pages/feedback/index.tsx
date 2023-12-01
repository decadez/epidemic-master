import BaseLayout from '@src/layouts/BaseLayout';
import * as React from 'react';
import { AtButton, AtForm, AtInput, AtTextarea } from 'taro-ui';

export default function Feedback() {
  const [values, setValues] = React.useState({});
  const onSubmit = () => {};
  const onReset = () => {};
  const selector = ['美国', '中国', '巴西', '日本'];
  const handleChange = (value) => {
    setValues({
      ...values,
      ...value,
    });
  };

  return (
    <BaseLayout>
      <AtForm onSubmit={onSubmit} onReset={onReset}>
        <AtInput
          className="m-t-20"
          name="value"
          title="问题简述"
          type="text"
          required
          placeholder="请输入问题简述"
          onChange={(e) => {
            handleChange({
              // temp: e?.target?.value
            });
          }}
        />
      </AtForm>
      <AtTextarea
        className="m-t-20"
        value={''}
        onChange={() => {}}
        maxLength={200}
        height={500}
        placeholder="其它补充..."
      />
      <AtButton className="m-t-20" type="primary" formType="submit">
        提交
      </AtButton>
      <AtButton className="m-t-20" formType="reset">
        重置
      </AtButton>
    </BaseLayout>
  );
}
