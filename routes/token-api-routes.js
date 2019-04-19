// We will want to have a way to view all the tokens so that the players can pick which they want to play.  I'm not seeing a need to delete, update the info though... view only

let db = require("../models");

module.exports = function(app) {
  // TODO: Just in case I forget to change it back, I'm testing displaying the tokens list with this by changing findOne to findAll and where: id to where: name. I need a route like this. TODO: NOTE: This is *DEFINITELY* returning what I need: an arry of token objects. I just need to figure out how to feed that to handlebars.
  app.get("/api/tokens/:name", function(req, res) {
    // This will get real time update info for all clients
    db.tokens
      .findAll({
        where: {
          name: req.params.name
        }
      })
      .then(function(tokensArray) {
        // I just need handlebars to eat this data and spit it into my template.
        res.json(tokensArray);
      });
  });
};
