"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  method: "PATCH",
  path: "/rooms/{id}",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      params: {
        id: Joi.number().integer()
      },
      payload: {
        type: Joi.string(),
        description: Joi.string(),
        image: Joi.string(),
        price: Joi.number()
      }
    },
    handler: async (request, h) => {
      try {
        const { roomService } = request.services();
        return await roomService.update(request.params.id, request.payload);
      } catch (error) {
        const { errorService } = request.services();
        return errorService.errorHandler(error, h);
      }
    }
  }
};
