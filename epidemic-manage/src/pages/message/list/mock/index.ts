import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '@/utils/setupMock';
import dayjs from 'dayjs';

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/workplace/overview-content'), () => {
      const year = new Date().getFullYear();
      const getLineData = () => {
        return new Array(12).fill(0).map((_item, index) => ({
          date: `${year}-${index + 1}`,
          count: Mock.Random.natural(0, 30),
        }));
      };
      return {
        allContents: '399',
        liveContents: '2',
        increaseComments: '293',
        growthRate: '2.8%',
        chartData: getLineData(),
      };
    });

    const getList = () => {
      const { list } = Mock.mock({
        'list|100': [
          {
            'rank|+1': 1,
            title: () =>
              Mock.Random.pick([
                '能不能两天一检查？',
                '3幢4楼401经常高空抛物！',
                '什么时候恢复核酸？',
                '社区开具无罪证明吗..',
              ]),
            pv: function () {
              return 500000 - 3200 * this.rank;
            },
            createTime: 0,
          },
        ],
      });
      return list;
    };
    const listText = getList();
    const listPic = getList();
    const listVideo = getList();

    Mock.mock(new RegExp('/api/workplace/popular-contents'), (params) => {
      const {
        page = 1,
        pageSize = 5,
        category = 0,
      } = qs.parseUrl(params.url).query as unknown as {
        page?: number;
        pageSize?: number;
        category?: number;
      };

      const list = [listText, listPic, listVideo][Number(category)];
      return {
        list: list.slice((page - 1) * pageSize, page * pageSize),
        total: 100,
      };
    });

    Mock.mock(new RegExp('/api/workplace/content-percentage'), () => {
      return [
        {
          type: '未检测',
          count: 30,
          percent: 0.1,
        },
        {
          type: '阳性',
          count: 54,
          percent: 0.18,
        },
        {
          type: '正常',
          count: 216,
          percent: 0.72,
        },
      ];
    });

    Mock.mock(new RegExp('/api/workplace/announcement'), () => {
      return [
        {
          type: 'activity',
          key: '1',
          content: '社区举办首届核酸采样大赛',
        },
        {
          type: 'info',
          key: '2',
          content: '来自李区长的一条消息',
        },
        {
          type: 'notice',
          key: '3',
          content: '接到上级通知所有72小时未检测核酸的居民均不得出小区。',
        },
      ];
    });
  },
});
