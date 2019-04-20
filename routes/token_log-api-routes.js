let db = require("../models");

module.exports = function(app) {
  // inserting a record in token_log.  Needed parameters are player_id, game_id, and token_id (tapped is defaulted false, but could be sent)
  app.post("/api/token_logs", function(req, res) {
    app.io.sockets.emit("update", req.body.game_id);
    db.token_logs.create(req.body).then(function() {
      res.redirect(`arena/${req.body.game_id}`); //
    });
  });
};
