// games : This table is key to the app.  It records a log of all games played (active, completed, or dropped) and is updated to show real time scores.  Here is the gist of how the table is used (table is dependent on player.id existing.  Table contributes to edits to token_log and result):
// - There are foreign keys  to the player.id record on this table (belongsTo), BUT, we don't cascade any delete events of players even if we allow deletion.  games history is not to be "disappeared"
// - When a new games is created, the "player1_id" field is populated with the games host, and depending on app logic, a life integer will be entered in life 1.  is_active is set to true (its active), and accept_new is set to true (it is accepting more players)
// - Logic is tbd, but it is likely the hosting player will declare at the start of games creation how many players there are (max 4).  As players join the games, the players slots of 2,3,4 can be filled.
// - Either the games logic starts the games or the host does, and the games_started field is populated.  This is to enable the duration field to calculate true games length as opposed to time spent hanging out in the games lobby.  Will there be the ability for a player to leave the lobby?  If so, will need that update query ready
// - once the games starts, accept_new is set to false, the life fields are updates as they are incremented or decremented.
// - when the games is over, is_active is set to false, a winner_id is populated (though, we may find this to be redundant).  The app writes games_id, player_id, outcome (w/l), final life, and duration to the RESULT table
// - There shouldn't be any need to store token info here, it should be able to be managed only in token and token log.  From there you can show what tokens were played, by whom, and on what games
// Queries needed: 5 Insert record for new games, update record to add players, update record to adjust life, update record to to trigger games start , update record to set end games info (these things *could* be stored only in results table, and we may end up doing that).  A query associated with the result table will add that needful data

let db = require("../models");
let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // creating games and establishing initial parameters.  Starting data is player1_id (and, if we elect to go this route, how many players)
  app.post("/api/newGame", isAuthenticated, function(req, res) {
    db.games.create({ player1_id: req.user.id, life1: 20 }).then(data => {
      link = `/arena/${data.dataValues.id}`;
      res.redirect(link);
    });
  });

  // PUT route for updating games.  We are going to update, depending on the flow of the games, most of the fields in the table, using this
  app.put("/api/games", function(req, res) {
    app.io.sockets.emit("update", req.body.game_id);
    db.games
      .update(req.body, {
        where: {
          id: req.body.game_id
        }
      })
      .then(function() {
        res.redirect(`/api/games/${req.body.game_id}`);
      });
  });
};
