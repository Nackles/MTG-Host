// TOKEN_LOG  This simple table shows token played, who played it, what game played it.  Naturallyl it is dependent on a player.id and a game.id existing (and a token.id, obviously).
// Query needed:  2  A query to insert the record, a query to display the record with the parameters of game id and player id (it shows a running tally of tokens played per game).  There is no need to set active or delete any records here, they live forever.  Later we could have some stats that show how many tokens a user has played per game or shows the type of tokens they favor

module.exports = function(sequelize, DataTypes) {
  let token_logs = sequelize.define("token_logs", {
    game_id: {
      type: DataTypes.INTEGER
      // references: { model: games, key: "id" }
    },
    player_id: {
      type: DataTypes.INTEGER
      // references: { model: players, key: "id" }
    },
    token_id: {
      type: DataTypes.INTEGER
      // references: { model: tokens, key: "id" }
    },
    tapped: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  token_logs.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    token_logs.belongsTo(models.games, {
      forignKey: "game_id",
      onDelete: "no action",
      onUpdate: "no action"
    });
  };

  token_logs.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    token_logs.belongsTo(models.players, {
      forignKey: "token_id",
      onDelete: "no action",
      onUpdate: "no action"
    });
  };

  token_logs.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    token_logs.belongsTo(models.tokens, {
      forignKey: "token_id",
      onDelete: "no action",
      onUpdate: "no action"
    });
  };

  return token_logs;
};

// create table if not exists token_log
//   (
//     id INT NOT NULL AUTO_INCREMENT,
//     game_id INT REFERENCES game(id),
//     player_id INT REFERENCES player(id),
//     token_id INT REFERENCES token(id),
//     tapped BOOLEAN default false,
//     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//     updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
//     PRIMARY KEY(id)
//   );
