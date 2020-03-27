const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("shoudl be able create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "TDD",
        email: "TDD@email.com",
        whatsapp: "12345678901",
        city: "bauru",
        uf: "SP"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
