const crypto = require("crypto");
const dbConnection = require("../database/connection");

module.exports = {
  async index(req, resp) {
    const ongs = await dbConnection("ongs").select("*");

    return resp.json(ongs);
  },
  async store(req, resp) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await dbConnection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return resp.json({ id });
  }
};
