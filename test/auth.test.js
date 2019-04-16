process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;

chai.use(chaiHttp);
let request = "";
describe("User signup and sign-in tests:", () => {
  beforeEach(() => {
    request = chai.request(server);
  });

  // Test for signing up a new user
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

  // Passing test for the login route (correct authentication)
  describe("/api/login", () => {
    it("should authenticate user", done => {
      let user = {
        username: "Emile",
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

  // Failing test for the login route (incorrect authentication)
  describe("/api/login", () => {
    it("should not authenticate user and redirect to home", done => {
      let user = {
        username: "Emile",
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
