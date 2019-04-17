let db = require("../models");

module.exports = function(app) {
  app.get("/api/token_logs", function(req, res) {
    // This would be an admin dashboard of all token_logs in progress.  In real life this would be kept secure/secret
    db.token_logs
      .findAll({
        include: [db.token_logs]
      })
      .then(function(dbTokenLogs) {
        res.json(dbTokenLogs);
      });
  });

  // Get all tokens played in a selected game
  app.get("/api/token_logs/:game", function(req, res) {
    db.token_logs
      .findAll({
        where: {
          game_id: req.params.game
        },
        include: [db.tokens]
      })
      .then(function(dbTokenLogs) {
        res.json(dbTokenLogs);
      });
  });

  // This will get real time update info for all clients (tokens played/tapped by game, by player).  Hypothetically we could pull all for  given game, and then filter the results by player on the client side
  app.get("/api/token_logs/:id:game", function(req, res) {
    db.token_logs
      .findAll({
        where: {
          player_id: req.params.id,
          game_id: req.params.game
        }
      })
      .then(function(dbTokenLogs) {
        res.json(dbTokenLogs);
      });
  });

  // inserting a record in token_log.  Needed parameters are player_id, game_id, and token_id (tapped is defaulted false, but could be sent)
  app.post("/api/token_logs", function(req, res) {
    db.token_logs.create(req.body).then(function(dbTokenLogs) {
      res.json(dbTokenLogs);
    });
  });

  // PUT route for updating token_log.  The only thing for now we expect to update is "tapped."  Other than that we should have a static table
  app.put("/api/token_logs", function(req, res) {
    db.token_logs
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbTokenLogs) {
        res.json(dbTokenLogs);
      });
  });

  // Not likely we would delete token_log ids, but here it in just in case
  app.delete("/api/token_logs/:id", function(req, res) {
    db.token_logs
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbTokenLogs) {
        res.json(dbTokenLogs);
      });
  });
};
