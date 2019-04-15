var db = require('../models');

module.exports = function (app) {
  app.get('/api/users', function (req, res) {
    // There may not be a need to show all users other than in an admin capacity
    db.Author.findAll({
      include: [db.User]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.get('/api/authors/:id', function (req, res) {
    // This will pull just user data, though we likely need to find a way to ensure users can't look each other up
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // creating user and adding username and password
  app.post('/api/users', function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Not likely we would delete user ids, but here it in just in case
  app.delete('/api/users/:id', function (req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

};
