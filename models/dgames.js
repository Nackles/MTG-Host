// GAME : This table is key to the app.  It records a log of all games played (active, completed, or dropped) and is updated to show real time scores.  Here is the gist of how the table is used (table is dependent on player.id existing.  Table contributes to edits to token_log and result):
// - There are foreign keys  to the player.id record on this table (belongsTo), BUT, we don't cascade any delete events of players even if we allow deletion.  Game history is not to be 'disappeared'
// - When a new game is created, the 'player1_id' field is populated with the game host, and depending on app logic, a life integer will be entered in life 1.  is_active is set to true (its active), and accept_new is set to true (it is accepting more players)
// - Logic is tbd, but it is likely the hosting player will declare at the start of game creation how many players there are (max 4).  As players join the game, the players slots of 2,3,4 can be filled.
// - Either the game logic starts the game or the host does, and the game_started field is populated.  This is to enable the duration field to calculate true game length as opposed to time spent hanging out in the game lobby.  Will there be the ability for a player to leave the lobby?  If so, will need that update query ready
// - once the game starts, accept_new is set to false, the life fields are updates as they are incremented or decremented.
// - when the game is over, is_active is set to false, a winner_id is populated (though, we may find this to be redundant).  The app writes game_id, player_id, outcome (w/l), final life, and duration to the RESULT table
// - There shouldn't be any need to store token info here, it should be able to be managed only in token and token log.  From there you can show what tokens were played, by whom, and on what game
// Queries needed: 5 Insert record for new game, update record to add players, update record to adjust life, update record to to trigger game start , update record to set end game info (these things *could* be stored only in results table, and we may end up doing that).  A query associated with the result table will add that needful data

module.exports = function(sequelize, DataTypes) {
  let games = sequelize.define("games", {
    player1_id: {
      type: DataTypes.INTEGER,
      references: { model: "players", key: "id" }
    },
    player2_id: {
      type: DataTypes.INTEGER,
      references: { model: "players", key: "id" }
    },
    player3_id: {
      type: DataTypes.INTEGER,
      references: { model: "players", key: "id" }
    },
    player4_id: {
      type: DataTypes.INTEGER,
      references: { model: "players", key: "id" }
    },
    life1: DataTypes.INTEGER,
    life2: DataTypes.INTEGER,
    life3: DataTypes.INTEGER,
    life4: DataTypes.INTEGER,
    duration: DataTypes.TIME,
    game_started: { type: DataTypes.TIME, defaultValue: null },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    accept_new: { type: DataTypes.BOOLEAN, defaultValue: true },
    winner_id: {
      type: DataTypes.INTEGER,
      references: { model: "players", key: "id" }
    }
  });

  return games;
};
