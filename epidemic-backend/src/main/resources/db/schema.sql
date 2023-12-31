DROP TABLE IF EXISTS health;
DROP TABLE IF EXISTS notice;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS message_leave;

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
);

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
);

CREATE TABLE  message_leave(
    id INT PRIMARY KEY AUTO_INCREMENT,
    creator VARCHAR(20) NOT NULL,
    title VARCHAR(200) default null,
    content LONGTEXT default NULL,
    messages LONGTEXT default NULL,
    status ENUM('REPLIED', 'NULL' ) default null,
    create_at timestamp DEFAULT CURRENT_TIMESTAMP,
    edit_at timestamp DEFAULT CURRENT_TIMESTAMP
);

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
);
