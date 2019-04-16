-- establishing tables.  REMOVE ALL DROP COMMANDS PRIOR TO LIVE DEPLOY OR RISK LOSING IT ALL! (Also, enable rollback functionality)

drop database if exists mtg_ben;
create database mtg_ben;
use mtg_ben;

create table if not exists users
(
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(35) NOT NULL,
  password varchar(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);

create table if not exists players
(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL REFERENCES users(id),
  name VARCHAR(25) NOT NULL,
  img_link VARCHAR(2083), -- evidently this is the URL limit
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);

create table if not exists games
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
  PRIMARY KEY (id),
  FOREIGN KEY (player1_id) REFERENCES players(id),
  -- we aren't going to cascade updates or deletes because game logs always maintain integrity
  FOREIGN KEY (player2_id) REFERENCES players(id),
  FOREIGN KEY (player3_id) REFERENCES players(id),
  FOREIGN KEY (player4_id) REFERENCES players(id),
  FOREIGN KEY (winner_id) REFERENCES players(id)
);



create table if not exists tokens
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

create table if not exists token_logs
(
  id INT NOT NULL AUTO_INCREMENT,
  game_id INT REFERENCES games(id),
  player_id INT REFERENCES players(id),
  token_id INT REFERENCES tokens(id),
  tapped BOOLEAN default false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
);
-- CREATE INDEX game_id ON games (id);

create table if not exists results
(
  id INT NOT NULL AUTO_INCREMENT,
  game_id int REFERENCES games(id),
  player_id int REFERENCES players(id),
  outcome CHAR(1), -- could use a boolean but want to leave a "Draw" or "Dropped Game" state
  life INT,
  duration TIME,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)
  --  We shouldn't need foreign keys here because we defined them in game_id and player_id in this table.  We'll see!
);



