import React from 'react';
import {
  Link,
  Card,
  Divider,
  Message,
  Typography,
} from '@arco-design/web-react';
import {
  IconPlus,
  IconList,
  IconMessage,
  IconSettings,
  IconHeart,
} from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/shortcuts.module.less';

function Shortcuts() {
  const t = useLocale(locale);

  const shortcuts = [
    {
      title: '公告创建',
      key: 'Content Management',
      icon: <IconPlus />,
    },
    {
      title: '公告列表',
      key: 'Content Statistic',
      icon: <IconList />,
    },
    {
      title: '留言回复',
      key: 'Advanced Management',
      icon: <IconMessage />,
    },
    {
      title: '健康打卡',
      key: 'Online Promotion',
      icon: <IconHeart />,
    },
    {
      title: '个人中心',
      key: 'Marketing',
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
    Message.info({
      content: (
        <span>
          You clicked <b>{key}</b>
        </span>
      ),
    });
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            onClick={() => onClickShortcut(shortcut.key)}
          >
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Shortcuts;
