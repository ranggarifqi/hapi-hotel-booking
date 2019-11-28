"use strict";

const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");

module.exports = {
  method: "PATCH",
  path: "/room_types/{id}",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      params: {
        id: Joi.number().integer()
      },
      payload: {
        name: Joi.string(),
        description: Joi.string(),
        image: Joi.string(),
        qty: Joi.number().integer(),
        price: Joi.number()
      }
    },
    handler: async (request, h) => {
      try {
        const { roomTypeService } = request.services();
        return await roomTypeService.update(request.params.id, request.payload);
      } catch (error) {
        console.log(error);
        return Boom.boomify(error, { statusCode: error.statusCode });
      }
    }
  }
};
