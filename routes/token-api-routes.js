// We will want to have a way to view all the tokens so that the players can pick which they want to play.  I'm not seeing a need to delete, update the info though... view only

let db = require("../models");

module.exports = function(app) {
  app.post("/api/tokens", function(req, res) {
    // Not likely to post Tokens but lets find a way to seed the data
    db.tokens
      .create({
        include: [db.tokens]
      })
      .then(function(dbTokens) {
        res.json(dbTokens);
      });
  });

  app.put("/api/tokens", function(req, res) {
    // This would be an admin dashboard of all tokens in progress.  In real life this would be kept secure/secret
    db.tokens
      .update({
        include: [db.tokens]
      })
      .then(function(dbTokens) {
        res.json(dbTokens);
      });
  });

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

  // Contacting the server RE: token names and getting the JSON to handlebars.
  app.get("/api/tokens/:name", function(req, res) {
    // This will get real time update info for all clients
    db.tokens
      .findAll({
        where: {
          name: req.params.name
        }
      })
      .then(function(dbTokens) {
        res.json(dbTokens);
      });
  });
};
