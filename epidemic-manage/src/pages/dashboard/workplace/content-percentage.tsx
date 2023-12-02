import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from '@arco-design/web-react';
import { DonutChart } from 'bizcharts';
import request from 'axios';
import useLocale from '@/utils/useLocale';
import locale from './locale';

function PopularContent() {
  const t = useLocale(locale);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    request.get('/api/workplace/content-percentage')
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <Typography.Title heading={6}>
        全员打卡结果占比
      </Typography.Title>
      <Spin loading={loading} style={{ display: 'block' }}>
        <DonutChart
          autoFit
          height={340}
          data={data}
          radius={0.7}
          innerRadius={0.65}
          angleField="count"
          colorField="type"
          color={['grey', 'red', 'green']}
          interactions={[
            {
              type: 'element-single-selected',
            },
          ]}
          tooltip={{ showMarkers: false }}
          label={{
            visible: true,
            type: 'spider',
            formatter: (v) => `${(v.percent * 100).toFixed(0)}%`,
            style: {
              fill: '#86909C',
              fontSize: 14,
            },
          }}
          legend={{
            position: 'bottom',
          }}
          statistic={{
            title: {
              style: {
                fontSize: '14px',
                lineHeight: 2,
                color: 'rgb(--var(color-text-1))',
              },
              formatter: () => '社区总人口',
            },
            content: {
              style: {
                fontSize: '16px',
                color: 'rgb(--var(color-text-1))',
              },
              formatter: (_, data) => {
                const sum = data.reduce((a, b) => a + b.count, 0);
                return Number(sum).toLocaleString();
              },
            },
          }}
        />
      </Spin>
    </Card>
  );
}

export default PopularContent;
