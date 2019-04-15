process.env.NODE_ENV = "test";

let db = require("../models");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;

chai.use(chaiHttp);
let request = "";
describe("users", () => {
  beforeEach(() => {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  // Test the /api/login route
  describe("/api/signup", () => {
    it("should create a new user", done => {
      let user = {
        username: "Name",
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
});
