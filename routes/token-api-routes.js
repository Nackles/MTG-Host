// We will want to have a way to view all the tokens so that the players can pick which they want to play.  I'm not seeing a need to delete, update the info though... view only

let db = require("../models");

module.exports = function(app) {
  app.get("/api/tokens", function(req, res) {
    // This would be an admin dashboard of all tokens in progress.  In real life this would be kept secure/secret
    db.tokens
      .findAll({
        include: [db.tokens]
      })
      .then(function(dbTokens) {
        res.json(dbTokens);
      });
  });

  app.get("/api/tokens/:id", function(req, res) {
    // This will get real time update info for all clients
    db.tokens
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbTokens) {
        res.json(dbTokens);
      });
  });
};
