process.env.NODE_ENV = "test";

let db = require("../models");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;

chai.use(chaiHttp);
let request = "";
describe("User Signup", () => {
  beforeEach(() => {
    request = chai.request(server);
    db.users.destroy({ where: {} });
    db.users.create({ username: "Bob", password: "password" });
  });

  // Test the /api/login route
  describe("/api/signup", () => {
    it("should create a new user", done => {
      let user = {
        username: "Emile",
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

  describe("/api/login", () => {
    it("should authenticate a user", done => {
      let user = {
        username: "Bob",
        password: "password"
      };
      request
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.res.text).to.contain("Host or Join Game");
          done();
        });
    });
  });

  describe("/api/login", () => {
    it("should not authenticate a user and redirect to home", done => {
      let user = {
        username: "Bob",
        password: "pasword"
      };
      request
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.res.text).to.contain("Username:");
          expect(res.res.text).to.contain("Password:");
          done();
        });
    });
  });
});
