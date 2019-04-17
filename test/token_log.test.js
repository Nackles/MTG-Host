process.env.NODE_ENV = "test";
let db = require("../models");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;

chai.use(chaiHttp);
let request;
describe("SEED THE TOKEN_LOGs TABLE", function() {
  it("HERE are 3 Token Log events to start", function() {
    request = chai.request(server);
    db.token_logs.destroy({ where: {} });
    db.tokens_logs.create({
      game_id: 1,
      player_id: 2,
      token_id: 3,
      tapped: true
    });
    db.tokens_logs.create({
      game_id: 1,
      player_id: 2,
      token_id: 4
    });
    db.token_logs.create({
      game_id: 1,
      player_id: 1,
      token_id: 1
    });
  });

  //  We currently don't plan on having the GUI ability to add new tokens.  This is just for testing purposes (it will fail)
  it("POST 1 More Token Log!", function() {
    let token_log = {
      game_id: 2,
      player_id: 1,
      token_id: 2
    };
    request
      .post("/api/tokens")
      .send(token_log)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        // done();
      });
  });
});
