"use strict";

const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");

module.exports = {
  method: "DELETE",
  path: "/room_types/{id}",
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
        const { roomTypeService } = request.services();
        return await roomTypeService.delete(request.params.id);
      } catch (error) {
        console.log(error);
        return Boom.boomify(error, { statusCode: error.statusCode });
      }
    }
  }
};
