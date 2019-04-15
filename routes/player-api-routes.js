// Right now we can allow editing of the icon field, but hypothetically we can allow an edit to the name field with a way to make sure and update the user.username at the same time.

let db = require("../models");

module.exports = function(app) {
  app.get("/api/players", function(req, res) {
    // This would be an admin dashboard of all players in progress.  In real life this would be kept secure/secret
    db.player
      .findAll({
        include: [db.player]
      })
      .then(function(dbPlayer) {
        res.json(dbPlayer);
      });
  });

  app.get("/api/players/:id", function(req, res) {
    // This would be a "Show Profile" type screen
    db.player
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPlayer) {
        res.json(dbPlayer);
      });
  });

  // creating player and establishing initial parameters => however, as it stands now, we are creating the player record right after the username is created
  app.player("/api/players", function(req, res) {
    db.player.create(req.body).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // PUT route for updating players -- If we edit player name we will want to update player login username (maybe?)
  app.put("/api/players", function(req, res) {
    db.player
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbplayer) {
        res.json(dbplayer);
      });
  });

  // Not likely we would delete player ids, but here it in just in case
  app.delete("/api/players/:id", function(req, res) {
    db.player
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPlayer) {
        res.json(dbPlayer);
      });
  });
};
