import BaseLayout from '@src/layouts/BaseLayout';
import { Picker } from '@tarojs/components';
import * as React from 'react';
import {
  AtButton,
  AtForm,
  AtInput,
  AtList,
  AtListItem,
  AtTextarea,
} from 'taro-ui';

export default function Health() {
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
          title="今日温度"
          type="text"
          required
          placeholder="请输入温度，单位℃"
          onChange={(e) => {
            handleChange({
              // temp: e?.target?.value
            });
          }}
        />
        <Picker mode="selector" range={selector} onChange={() => {}}>
          <AtList hasBorder={false}>
            <AtListItem title="近期是否进出以下城市？" extraText={'美国'} />
          </AtList>
        </Picker>
        <AtListItem
          isSwitch
          title="近期是否出入高风险地区"
          hasBorder={false}
          onSwitchChange={() => {}}
        />
      </AtForm>
      <AtTextarea
        className="m-t-20"
        value={''}
        onChange={() => {}}
        maxLength={200}
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
