// We will want to have a way to view all the tokens so that the players can pick which they want to play.  I'm not seeing a need to delete, update the info though... view only

let db = require("../models");

module.exports = function(app) {
  app.get("/api/tokens", function(req, res) {
    // This would be an admin dashboard of all tokens in progress.  In real life this would be kept secure/secret
    db.token
      .findAll({
        include: [db.token]
      })
      .then(function(dbToken) {
        res.json(dbToken);
      });
  });

  app.get("/api/tokens/:id", function(req, res) {
    // This will get real time update info for all clients
    db.token
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbToken) {
        res.json(dbToken);
      });
  });
};
