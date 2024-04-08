create database IF NOT EXISTS `epidemic` default character set utf8 collate utf8_general_ci;

use epidemic;
-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS notice;
DROP TABLE IF EXISTS health;
DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) default null,
    username VARCHAR(20) NOT NULL,
    age INT default NULL,
    sex ENUM('MALE', 'FEMALE', 'NULL') default NULL,
    email VARCHAR(20) NOT NULL,
    avatar VARCHAR(100) default '/images/user/default.webp',
    id_card CHAR(18) UNIQUE default null,
    phone CHAR(11) default NULL,
    address VARCHAR(100) default NULL,
    password VARCHAR(100) NOT NULL,
    create_at timestamp DEFAULT CURRENT_TIMESTAMP,
    edit_at timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表';

-- ----------------------------
-- Table structure for notice
-- ----------------------------
CREATE TABLE notice (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, FOREIGN KEY (user_id) REFERENCES user(id),
    creator VARCHAR(20) NOT NULL,
    title VARCHAR(200) default null,
    img_url VARCHAR(200) default NULL,
    content LONGTEXT default NULL,
    status ENUM('CLOSE','OPEN', 'NULL' ) default null,
    create_at timestamp DEFAULT CURRENT_TIMESTAMP,
    edit_at timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '公告表';

-- ----------------------------
-- Table structure for message_leave
-- ----------------------------
DROP TABLE IF EXISTS message_leave;
CREATE TABLE  message_leave(
    id INT PRIMARY KEY AUTO_INCREMENT,
    creator VARCHAR(20) NOT NULL,
    title VARCHAR(200) default null,
    content LONGTEXT default NULL,
    messages LONGTEXT default NULL,
    nature_of_speech ENUM('WAITING', 'GOOD', "BAD" ) default 'WAITING',
    status ENUM('REPLIED', 'NULL' ) default null,
    create_at timestamp DEFAULT CURRENT_TIMESTAMP,
    edit_at timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '消息通知表';

--DROP TABLE IF EXISTS user_messageLeave_relationship;
--CREATE TABLE  user_messageLeave_relationship(
--    supporter_ids VARCHAR(200) default null,
--    questioner_id VARCHAR(20) NOT NULL,
--    message_id  INT NOT NULL,
--) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'user与消息表中间表';

-- ----------------------------
-- Table structure for health
-- ----------------------------
CREATE TABLE health (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    temperature DOUBLE NOT NULL,
    symptoms VARCHAR(50) DEFAULT '',
    has_contact_history BOOLEAN NOT NULL DEFAULT FALSE,
    contact_people VARCHAR(100) DEFAULT '',
    FOREIGN KEY(user_id) REFERENCES user(id),
    create_at timestamp DEFAULT CURRENT_TIMESTAMP,
    edit_at timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '健康上报表';
