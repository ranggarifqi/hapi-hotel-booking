"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  method: "POST",
  path: "/rooms",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      payload: {
        type: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string(),
        price: Joi.number().required()
      }
    },
    handler: async (request, h) => {
      try {
        const { roomService } = request.services();
        return await roomService.create(request.payload);
      } catch (error) {
        const { errorService } = request.services();
        return errorService.errorHandler(error, h);
      }
    }
  }
};
