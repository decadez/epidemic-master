import Mock from 'mockjs';
import qs from 'query-string';
import dayjs from 'dayjs';
import setupMock from '@/utils/setupMock';

const { list } = Mock.mock({
  'list|100': [
    {
      id: /[0-9]{8}[-][0-9]{4}/,
      name: () =>
        Mock.Random.pick([
          '汤成一品新增200例',
          '泰和新城新增100例',
          '3岁小孩扶老奶奶过马路',
        ]),
      image: () => Mock.Random.pick(['图1', '图2', '图3']),
      creator: () => Mock.Random.pick(['张三', '卢本伟', '赵四']),
      'createTime|1-60': 0,
      'status|0-2': 0,
    },
  ],
});

const filterData = (
  rest: {
    id?: string;
    name?: string;
    image?: string;
    creator?: string;
    'createTime[]'?: string[];
    'status[]'?: string;
  } = {}
) => {
  const {
    id,
    name,
    image: image,
    creator: creator,
    'createTime[]': createTime,
    'status[]': status,
  } = rest;
  if (id) {
    return list.filter((item) => item.id === id);
  }
  let result = [...list];
  if (name) {
    result = result.filter((item) => {
      return (item.name as string).toLowerCase().includes(name.toLowerCase());
    });
  }
  if (image) {
    result = result.filter((item) => image.includes(item.image.toString()));
  }
  if (creator) {
    result = result.filter((item) => creator.includes(item.creator.toString()));
  }
  if (createTime && createTime.length === 2) {
    const [begin, end] = createTime;
    result = result.filter((item) => {
      const time = dayjs()
        .subtract(item.createTime, 'days')
        .format('YYYY-MM-DD HH:mm:ss');
      return (
        !dayjs(time).isBefore(dayjs(begin)) && !dayjs(time).isAfter(dayjs(end))
      );
    });
  }

  if (status && status.length) {
    result = result.filter((item) => status.includes(item.status.toString()));
  }

  return result;
};

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/list'), (params) => {
      const {
        page = 1,
        pageSize = 10,
        ...rest
      } = qs.parseUrl(params.url).query;
      const p = page as number;
      const ps = pageSize as number;

      const result = filterData(rest);
      return {
        list: result.slice((p - 1) * ps, p * ps),
        total: result.length,
      };
    });
  },
});
