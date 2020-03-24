const { Router } = require("express");
const OngsController = require("./controllers/Ongs_controllers");
const IncidentController = require("./controllers/Incidents_controllers");
const ProfileController = require("./controllers/Profile_controllers");
const SessionController = require("./controllers/Session_controllers");

const routes = Router();

routes.post("/sessions", SessionController.store);

routes.get("/ongs", OngsController.index);
routes.post("/ongs", OngsController.store);

routes.get("/profile", ProfileController.index);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.store);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;
