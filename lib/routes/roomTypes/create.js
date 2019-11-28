"use strict";

const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");

module.exports = {
  method: "POST",
  path: "/room_types",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      payload: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string(),
        qty: Joi.number().integer(),
        price: Joi.number().required()
      }
    },
    handler: async (request, h) => {
      try {
        const { roomTypeService } = request.services();
        return await roomTypeService.create(request.payload);
      } catch (error) {
        console.log(error);
        return Boom.boomify(error, { statusCode: error.statusCode });
      }
    }
  }
};
