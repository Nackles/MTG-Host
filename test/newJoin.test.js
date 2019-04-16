process.env.NODE_ENV = "test";

let db = require("../models");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;

chai.use(chaiHttp);
let request = "";
describe("User signup and sign-in tests:", () => {
  beforeEach(() => {
    request = chai.request(server);
    db.users.destroy({ where: {} });
    db.users.create({ username: "Bob", password: "password" });
  });

  describe("User creates a new game", () => {
    it("should add a new game object to the database", done => {
      request
        .post("/api/login")
        .send({ username: "Bob", password: "password" })
        .end(err => {
          expect(err).to.be.null;
          addGame(request, done);
        });
    });
  });
});

/**
 *
 * @param {object} request The request object created by chai.request(server)
 * @param {function} cb Callback function to be run after completion that is being passed the request object
 */
function addGame(cb) {
  let newGame = {}; // TODO: Update with the values that would be put into the database once the model is working for games
  chai
    .request(server)
    .post("/api/games")
    .send(newGame)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.be.a("object");
      expect(res.res.text).to.contain("PLAYER LIFE TRACKER");
      cb(request);
    });
}
