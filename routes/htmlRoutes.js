// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");
let db = require("../models");
let log = require("con-logger");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/lobby");
    }
    res.render("index");
  });

  app.get("/lobby", isAuthenticated, function(req, res) {
    res.render("lobby");
  });

  app.get("/arena/:gameId", isAuthenticated, function(req, res) {
    log(req.params.gameId);
    db.games.findOne({ where: { id: req.params.gameId } }).then(data => {
      log(data);
      res.render("arena", data);
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.post("/arena/join", isAuthenticated, function(req, res) {
    let gameId = req.body.id;
    let player = "";
    let life = "";
    db.games
      .findOne({ where: { id: gameId } })
      .then(data => {
        let game = data.dataValues;
        for (let i = 2; i < 5; i++) {
          if (!game[`player${i}_id`]) {
            player = `player${i}_id`;
            life = `life${i}`;
            return;
          }
        }
        res.redirect("/lobby"); // TODO: Add a screen for when a game is full
      })
      .then(() => {
        db.games
          .update(
            { [player]: req.user.id, [life]: 20 },
            { where: { id: req.body.id } }
          )
          .then(() => {
            res.redirect(`/arena/${gameId}`);
          });
      });
  });

  app.post("/arena/newGame", isAuthenticated, function(req, res) {
    db.games.create({ player1_id: req.user.id }).then(data => {
      link = `/arena/${data.dataValues.id}`;
      res.redirect(link);
    });
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
