"use strict";

const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

module.exports = {
  method: "DELETE",
  path: "/bookings/{id}",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      params: {
        id: Joi.number().integer()
      }
    },
    handler: async (request, h) => {
      try {
        const { bookingService } = request.services();
        return await bookingService.delete(request.params.id);
      } catch (error) {
        console.log(error);
        return Boom.boomify(error, { statusCode: error.statusCode });
      }
    }
  }
};
