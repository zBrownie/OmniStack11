const dbConnection = require("../database/connection");

module.exports = {
  async store(req, resp) {
    const { id } = req.body;

    const ong = await dbConnection("ongs")
      .where("id", id)
      .select("name")
      .first();

    if (!ong) {
      return resp.status(400).json({ error: "ONG não encontrada!" });
    }

    return resp.json(ong);
  }
};
