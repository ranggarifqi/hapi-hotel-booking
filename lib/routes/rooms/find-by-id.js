"use strict";

const Joi = require('@hapi/joi');

module.exports = {
  method: "GET",
  path: "/rooms/{id}",
  options: {
    tags: ["api"],
    auth: 'jwt',
    validate: {
      params: {
        id: Joi.number().integer()
      }
    },
    handler: async (request, h) => {
      const { id } = request.params;
      const { roomService } = request.services();
      try {
        return await roomService.findById(id);
      } catch (error) {
        const { errorService } = request.services();
        return errorService.errorHandler(error, h);
      }
    }
  }
};
