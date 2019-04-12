-- establishing tables.  REMOVE ALL DROP COMMANDS PRIOR TO LIVE DEPLOY OR RISK LOSING IT ALL! (Also, enable rollback functionality)

drop database if exists mtg_ben;
create database mtg_ben;
use mtg_ben;
drop table if exists user;

create table user
(
  id INT NOT NULL AUTO_INCREMENT,
  userid VARCHAR(25) NOT NULL,
  img_link VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);
select * from user;

create table if not exists game
(
  id INT NOT NULL AUTO_INCREMENT,
  player1_id INT,
  player2_id INT,
  player3_id INT,
  player4_id INT,
  life1 INT,
  life2 INT,
  life3 INT,
  life4 INT,
  duration TIME,
  winner_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);

create table if not exists token
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR (255) not null,
  color VARCHAR (255),
  type VARCHAR (255),
  pt VARCHAR (255),
  abilities VARCHAR (255),
  icon varchar(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  last_updated_by int default 1,
  PRIMARY KEY (id)
);

create table if not exists token_log
(
  id INT NOT NULL AUTO_INCREMENT,
  game_id INT,
  user_id INT,
  token_id int,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);






