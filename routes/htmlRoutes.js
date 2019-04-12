// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/lobby");
    }
    res.render("index");
  });

  app.get("/lobby", function(req, res) {
    res.render("lobby");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/arena/:gameId", isAuthenticated, function(req, res) {
    let gameId = req.params.gameId;
    res.render("arena", {
      example: { id: 1, text: "A test", description: gameId }
    });
  });
};
