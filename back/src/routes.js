const { Router } = require("express");
const OngsController = require("./controllers/Ongs_controllers");
const IncidentController = require("./controllers/Incidents_controllers");
const ProfileController = require("./controllers/Profile_controllers");
const SessionController = require("./controllers/Session_controllers");

const { celebrate, Segments, Joi } = require("celebrate");

const routes = Router();

routes.post("/sessions", SessionController.store);

routes.get("/ongs", OngsController.index);
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .length(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngsController.store
);

routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.index
);
routes.post("/incidents", IncidentController.store);

routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

module.exports = routes;
