const dbConnection = require("../database/connection");
const generateId = require("../utils/generateUniqueID");
module.exports = {
  async index(req, resp) {
    const ongs = await dbConnection("ongs").select("*");

    return resp.json(ongs);
  },
  async store(req, resp) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateId();

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
