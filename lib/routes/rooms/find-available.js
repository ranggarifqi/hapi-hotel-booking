"use strict";

const Joi = require("@hapi/joi").extend(require('@hapi/joi-date'));
const Boom = require("@hapi/boom");

module.exports = {
  method: "GET",
  path: "/rooms/available",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      query: {
        checkInDate: Joi.date().format('YYYY-MM-DD').required()
      }
    },
    handler: async (request, h) => {
      const { checkInDate } = request.query;
      const { roomService } = request.services();
      try {
        const res = await roomService.findAvailableRoom(checkInDate);
        // return await roomService.findAll({ limit, offset });
        return res;
      } catch (error) {
        console.log(error);
        return Boom.badRequest(error.message);
      }
    }
  }
};
