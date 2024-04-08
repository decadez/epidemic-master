import useLocale from '@/utils/useLocale';
import { Card, Link, Message, Typography } from '@arco-design/web-react';
import {
  IconHeart,
  IconList,
  IconMessage,
  IconPlus,
  IconSettings,
} from '@arco-design/web-react/icon';
import locale from './locale';
import styles from './style/shortcuts.module.less';
import { useHistory } from 'react-router-dom';

function Shortcuts() {
  const t = useLocale(locale);
  const history = useHistory();

  const shortcuts = [
    {
      title: '公告创建',
      key: '/notice/create',
      icon: <IconPlus />,
    },
    {
      title: '公告列表',
      key: '/notice/list',
      icon: <IconList />,
    },
    {
      title: '留言回复',
      key: '/message/list',
      icon: <IconMessage />,
    },
    {
      title: '健康打卡',
      key: '/health/history',
      icon: <IconHeart />,
    },
    {
      title: '个人中心',
      key: '/user/setting',
      icon: <IconSettings />,
    },
  ];

  const recentShortcuts = [
    {
      title: t['workplace.contentStatistic'],
      key: 'Content Statistic',
      icon: <IconSettings />,
    },
    {
      title: t['workplace.contentMgmt'],
      key: 'Content Management',
      icon: <IconSettings />,
    },
    {
      title: t['workplace.advancedMgmt'],
      key: 'Advanced Management',
      icon: <IconSettings />,
    },
  ];

  function onClickShortcut(key) {
    history.push(`${key}`)
  }

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Typography.Title heading={6}>
          {t['workplace.shortcuts']}
        </Typography.Title>
        <Link>{t['workplace.seeMore']}</Link>
      </div>
      <div className={styles.shortcuts}>
        {shortcuts.map((shortcut) => (
          <div
            className={styles.item}
            key={shortcut.key}
            onClick={() => onClickShortcut(shortcut.key)}>
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Shortcuts;
