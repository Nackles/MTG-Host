process.env.NODE_ENV = "test";
let db = require("../models");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;

chai.use(chaiHttp);
let request;
describe("SEED THE TOKENS TABLE", function() {
  it("HERE are 4 Tokens to start", function() {
    request = chai.request(server);
    db.tokens.destroy({ where: {} });
    db.tokens.create({
      name: "Boar",
      color: "Green",
      type: "Creature>Beast",
      pt: "2/2",
      abilities: "Curse of the Swine",
      icon: "https://tokens.mtg.onl/tokens/THS_8-Boar.jpg",
      last_updated_by: "MOCHA-TEST-FUNCTIONALITY"
    });
    db.tokens.create({
      name: "Dragon",
      color: "Green",
      type: "Creature>Dragon",
      pt: "6/6",
      abilities: "Flying",
      icon: "https://tokens.mtg.onl/tokens/C17_007-Dragon.jpg",
      last_updated_by: "MOCHA-TEST-FUNCTIONALITY"
    });
    db.tokens.create({
      name: "Eldrazi",
      color: "Black",
      type: "Creature>Eldrazi",
      pt: "10/10",
      abilities: "Creeper",
      icon: "https://tokens.mtg.onl/tokens/BFZ_001-Eldrazi.jpg",
      last_updated_by: "MOCHA-TEST-FUNCTIONALITY"
    });
    db.tokens.create({
      name: "Goblin",
      color: "Black",
      type: "Creature>Goblin",
      pt: "1/1",
      abilities: "Kneecapper",
      icon: "https://tokens.mtg.onl/tokens/EVG_T3-Goblin.jpg",
      last_updated_by: "MOCHA-TEST-FUNCTIONALITY"
    });
  });

  //  We currently don't plan on having the GUI ability to add new tokens.  This is just for testing purposes (it will fail)
  it("POST 1 More TOKEN!", function() {
    let token = {
      name: "Poldark",
      color: "Welsh Green",
      type: "Human>Hammy Actor",
      pt: "5/1",
      abilities: "Brooding",
      icon:
        "https://tvshowscancelled.com/wp-content/uploads/2016/06/poldark5-wpcf_710x400.jpg",
      last_updated_by: "MC Turny B"
    };
    request
      .post("/api/tokens")
      .send(token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        // done();
      });
  });
});
