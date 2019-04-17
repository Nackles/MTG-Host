process.env.NODE_ENV = "test";

let db = require("../models");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;

chai.use(chaiHttp);
let request = "";
describe("POST Initial Seeds (Bronson and SPOCK", () => {
  it("Steps to follow", () => {
    request = chai.request(server);
    db.players.create({ user_id: 1, name: "Bronson" });
    db.players.create({
      user_id: 2,
      name: "Spock",
      img_link: "http://placeimg.com/60/60/animals"
    });
  });

  // Test the /api/login route
  describe("/api/players", () => {
    it("POST Add Boris", done => {
      let player = {
        user_id: 3,
        name: "BORIS",
        img_link: "http://???"
      };
      request
        .post("/api/players")
        .send(player)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.a("object");
          done();
        });
    });
  });

  it("PUT: Add image link to BORIS", function(done) {
    // Create an object to send to the endpoint
    let player = {
      user_id: 3,
      name: "BORIS",
      img_link: "http://placeimg.com/60/60/animals"
    };
    // Update the object in the server
    request
      .put("/api/players")
      .send(player)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        done();
      });
  });
});
