select * from game;

create table if not exists gametester
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
  FOREIGN KEY (player1_id) REFERENCES player(id),
  -- we aren't going to cascade updates or deletes because game logs always maintain integrity
  FOREIGN KEY (player1_id) REFERENCES Persons(id),
  FOREIGN KEY (player1_id) REFERENCES Persons(id),
  FOREIGN KEY (player1_id) REFERENCES Persons(id),
  FOREIGN KEY (winner_id) REFERENCES Persons(id)
);