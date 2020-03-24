const dbConnection = require("../database/connection");

module.exports = {
  async index(req, resp) {
    const ong_id = req.headers.authorization;

    const response = await dbConnection("incidents")
      .where("ong_id", ong_id)
      .select("*");

    return resp.json(response);
  }
};
