process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;

chai.use(chaiHttp);
let request = "";
describe("User creating and joining games tests:", () => {
  beforeEach(() => {
    request = chai.request(server);
  });

  // Authenticates a user
  describe("/api/signup", () => {
    it("should create a new user", done => {
      let user = {
        username: "Nick",
        password: "password"
      };
      request
        .post("/api/signup")
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.a("object");
          done();
        });
    });
  });

  // User creates a game. This needs to be seeded with game information
  describe("User creates a new game", () => {
    it("should add a new game object to the database", done => {
      request.post("/arena/newGame").end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.a("object");
        expect(res.res.text).to.contain("PLAYER LIFE TRACKER");
        done();
      });
    });
  });

  // Second user joins a game
  describe("Player 2 joins a new game", () => {
    it("should add a player to the game and send them in to the lobby", done => {
      let player = { id: 1, player2_id: 3 };
      request
        .post("/arena/join")
        .send(player)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.a("object");
          expect(res.res.text).to.contain("PLAYER LIFE TRACKER");
          done();
        });
    });
  });
});
