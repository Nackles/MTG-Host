let db = require("../models");

module.exports = function(app) {
  app.get("/api/token_logs", function(req, res) {
    // This would be an admin dashboard of all token_logs in progress.  In real life this would be kept secure/secret
    db.token_log
      .findAll({
        include: [db.token_log]
      })
      .then(function(dbTokenLog) {
        res.json(dbTokenLog);
      });
  });

  // This will get all the loaded tokens (500+?) for the player to choose from (maybe an autocomplete field on the client side?)
  app.get("/api/token_logs/", function(req, res) {
    db.token_log
      .findAll({
        // No parameters here, just grab all of them
      })
      .then(function(dbTokenLog) {
        res.json(dbTokenLog);
      });
  });

  // This will get real time update info for all clients (tokens played/tapped by game, by player).  Hypothetically we could pull all for  given game, and then filter the results by player on the client side
  app.get("/api/token_logs/:id:game", function(req, res) {
    db.token_log
      .findAll({
        where: {
          player_id: req.params.id,
          game_id: req.params.game
        }
      })
      .then(function(dbTokenLog) {
        res.json(dbTokenLog);
      });
  });

  // inserting a record in token_log.  Needed parameters are player_id, game_id, and token_id (tapped is defaulted false, but could be sent)
  app.post("/api/token_logs", function(req, res) {
    db.token_log.create(req.body).then(function(dbTokenLog) {
      res.json(dbTokenLog);
    });
  });

  // PUT route for updating token_log.  The only thing for now we expect to update is "tapped."  Other than that we should have a static table
  app.put("/api/token_logs", function(req, res) {
    db.player
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbTokenLog) {
        res.json(dbTokenLog);
      });
  });

  // Not likely we would delete token_log ids, but here it in just in case
  app.delete("/api/token_logs/:id", function(req, res) {
    db.token_log
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbTokenLog) {
        res.json(dbTokenLog);
      });
  });
};
