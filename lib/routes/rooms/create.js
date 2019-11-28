"use strict";

const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");

module.exports = {
  method: "POST",
  path: "/rooms",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      payload: {
        roomTypeId: Joi.number()
          .integer()
          .required(),
        roomNumber: Joi.string().required()
      }
    },
    handler: async (request, h) => {
      try {
        const { roomService } = request.services();
        return await roomService.create(request.payload);
      } catch (error) {
        console.log(error);
        return Boom.boomify(error, { statusCode: error.statusCode });
      }
    }
  }
};
