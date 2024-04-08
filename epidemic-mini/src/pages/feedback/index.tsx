import { createMessage } from '@service/messageLeave.service';
import BaseLayout from '@src/layouts/BaseLayout';
import Taro from '@tarojs/taro';
import * as React from 'react';
import { AtButton, AtForm, AtInput, AtMessage, AtTextarea } from 'taro-ui';
import TksPage from '../../components/TksPage';

export default function Feedback() {
  const [values, setValues] = React.useState<
    Partial<{
      title: string;
      content: string;
    }>
  >({});
  const [isFeedback, setIsFeedback] = React.useState(false);
  const onSubmit = async () => {
    const res = await createMessage(values);
    if (res) {
      Taro.atMessage({
        message: '反馈成功',
        type: 'success',
      });
      setIsFeedback(true);
    }
  };
  const onReset = () => {
    setValues({});
  };
  const handleChange = (value) => {
    setValues({
      ...values,
      ...value,
    });
  };

  return (
    <BaseLayout>
      <AtMessage />
      {isFeedback ? (
        <TksPage />
      ) : (
        <AtForm onSubmit={onSubmit} onReset={onReset}>
          <AtInput
            className="m-t-20"
            name="value"
            title="问题简述"
            type="text"
            required
            value={values.title}
            placeholder="请输入问题简述"
            onChange={(value) => {
              handleChange({
                title: value,
              });
            }}
          />
          <AtTextarea
            className="m-t-20"
            value=""
            onChange={(value) => {
              handleChange({
                content: value,
              });
            }}
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
        </AtForm>
      )}
    </BaseLayout>
  );
}
