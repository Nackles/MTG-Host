-- establishing tables.  REMOVE ALL DROP COMMANDS PRIOR TO LIVE DEPLOY OR RISK LOSING IT ALL! (Also, enable rollback functionality)

drop database if exists mtg_ben;
create database mtg_ben;
use mtg_ben;

create table user
(
  id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(35) NOT NULL,
  password varchar(255) NOT NULL,
  img_link VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);

create table if not exists player
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL,
  img_link VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);

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
  game_started TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  is_active boolean default true,
  accept_new boolean default true,
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
  game_id INT REFERENCES game(id),
  player_id INT REFERENCES player(id),
  token_id INT REFERENCES token(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);
-- CREATE INDEX game_id ON game (id);

create table if not exists result
(
  id INT NOT NULL AUTO_INCREMENT,
  game_id int REFERENCES game(id),
  player_id int REFERENCES player(id),
  outcome char(1), -- could use a boolean but want to leave a "Draw" or "Dropped Game" state
  life int,
  duration time,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);



