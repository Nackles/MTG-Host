process.env.NODE_ENV = "test";

let db = require("../../models");

function reset() {
  db.sequelize.sync({ force: true }).then(() => {
    db.sequelize.close();
    return;
  });
}

reset();
