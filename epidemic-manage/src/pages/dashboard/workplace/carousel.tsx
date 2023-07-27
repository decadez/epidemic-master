import React from 'react';
import { Carousel } from '@arco-design/web-react';

const imageSrc = ['https://img1.baidu.com/it/u=131698361,3715172942&fm=253&fmt=auto&app=120&f=JPEG?w=891&h=500', 'https://img1.baidu.com/it/u=131698361,3715172942&fm=253&fmt=auto&app=120&f=JPEG?w=891&h=500', 'https://img1.baidu.com/it/u=131698361,3715172942&fm=253&fmt=auto&app=120&f=JPEG?w=891&h=500'];
function C() {
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
      {imageSrc.map((src, index) => (
        <div key={index}>
          <img
            src={src}
            style={{
              width: 280,
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default C;
