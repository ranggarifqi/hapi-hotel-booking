"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  method: "DELETE",
  path: "/rooms/{id}",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      params: {
        id: Joi.number().integer()
      },
    },
    handler: async (request, h) => {
      try {
        const { roomService } = request.services();
        return await roomService.delete(request.params.id);
      } catch (error) {
        const { errorService } = request.services();
        return errorService.errorHandler(error, h);
      }
    }
  }
};
