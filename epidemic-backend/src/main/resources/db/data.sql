DELETE FROM user;

INSERT INTO user (name, username, password, email) VALUES
    ('张三', 'decadez', 'decadez', 'decadez@yeah.com'),
    ('李四','Jone', 'Jone', 'Jone@yeah.com'),
    ('王二麻', 'Jack', 'Jack', 'Jack@yeah.com'),
    ('老刘', 'admin', 'admin@tpxs', 'admin@tpxs');


INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (15, 4, '老刘', '核酸请到1号门，下午4点结束~', '/images/8a5c0a7e-e44b-4c19-86b5-bf00f0125361.webp', '<p>请互相转而告知~<strong>谢谢</strong></p><p></p><p></p><p><strong><span style=\"font-size:20px\"><em>爱你木木哒</em></span></strong></p>', 'OPEN', '2020-09-18 22:28:14', '2023-11-09 23:40:58');
INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (17, 3, '王二麻', '核酸请到2号门，下午2点结束~', '/images/e6de1fa2-00d6-453b-89e8-cfcd5c1a142f.jpg', '<p>核酸请到2号门，下午2点结束~</p>', 'CLOSE', '2020-08-05 08:53:02', '2023-11-09 23:40:54');
INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (18, 2, '李四', '核酸请到2号门，下午2点结束~', '/images/2d6d8b8f-a016-4875-b962-c8ee8c808f5e.webp', '<p>请互相转而告知~<strong>谢谢</strong></p><p></p><p></p><p><strong><span style=\"font-size:20px\"><em>爱你木木哒</em></span></strong></p>', 'NULL', '2020-02-18 16:54:59', '2023-11-09 23:39:08');
INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (3, 1, '张三', '闪闪红星社区招募开发~', '/images/8a5c0a7e-e44b-4c19-86b5-bf00f0125361.webp', '<p>闪闪红星社区招募开发~</p>', 'OPEN', '2019-12-24 08:37:06', '2023-11-09 23:41:00');
INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (1, 3, '王二麻', '核酸请到2号门，下午2点结束~', '/images/2d6d8b8f-a016-4875-b962-c8ee8c808f5e.webp', '<p>核酸请到2号门，下午2点结束~</p>', 'CLOSE', '2018-09-06 07:59:52', '2023-11-09 23:40:53');
INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (16, 2, '李四', '核酸请到2号门，下午2点结束~', '/images/8e5b44ad-447f-477c-a75b-ba17326dc8bc.jpg', '<p>核酸请到2号门，下午2点结束~</p>', 'NULL', '2017-10-13 09:21:59', '2023-11-09 23:39:56');
INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (2, 4, '老刘', '核酸请到2号门，下午2点结束~', '/images/2d6d8b8f-a016-4875-b962-c8ee8c808f5e.webp', '<p>核酸请到2号门，下午2点结束~</p>', 'CLOSE', '2014-01-05 03:46:07', '2023-11-09 23:40:52');
INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (7, 2, '李四', '核酸请到2号门，下午2点结束~', '/images/02e484db-80ac-4d96-9d30-62d5e3e83e6c.webp', '<p>核酸请到2号门，下午2点结束~</p>', 'CLOSE', '2009-10-31 05:58:51', '2023-11-09 23:40:51');
INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (19, 1, '张三', '核酸请到2号门，下午2点结束~', '/images/2d6d8b8f-a016-4875-b962-c8ee8c808f5e.webp', '<p>核酸请到2号门，下午2点结束~</p>', 'CLOSE', '2006-09-08 16:52:05', '2023-11-09 23:40:47');
INSERT INTO `epidemic`.`notice` (`id`, `user_id`, `creator`, `title`, `img_url`, `content`, `status`, `create_at`, `edit_at`) VALUES (5, 1, '张三', '核酸请到2号门，下午2点结束~', '/images/b3523ae7-0fdb-463b-9de9-f323dd0d2439.jpg', '<p>核酸请到2号门，下午2点结束~</p>', 'CLOSE', '2003-03-23 20:58:08', '2023-11-09 23:40:49');
