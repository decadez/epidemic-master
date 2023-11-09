import React from 'react';
import { Carousel } from '@arco-design/web-react';
import { getCommonNoticeList } from '@/service/notice.service';
import { useRequest } from 'ahooks';
import { baseUrl } from '@/utils/request';

function C() {
  const { data, run, loading } = useRequest(getCommonNoticeList, {
    manual: true,
  })

  React.useEffect(() => {
    run();
  }, [])

  return (
    <Carousel
      indicatorType="slider"
      showArrow="never"
      autoPlay
      style={{
        width: '100%',
        height: 160,
      }}
    >
      {data?.data?.map((item, index) => (
        <div key={index}>
          <img
            src={baseUrl + item.imgUrl}
            style={{
              width: 280,
              height: 160,
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default C;
