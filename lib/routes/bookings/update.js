"use strict";

const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const Boom = require("@hapi/boom");

module.exports = {
  method: "PATCH",
  path: "/bookings/{id}",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      params: {
        id: Joi.number().integer()
      },
      payload: {
        roomId: Joi.number()
          .integer()
          .required(),
        checkInAt: Joi.date()
          .format("YYYY-MM-DD")
          .required(),
        checkOutAt: Joi.date()
          .format("YYYY-MM-DD")
          .required()
      }
    },
    handler: async (request, h) => {
      try {
        const { bookingService } = request.services();
        return await bookingService.update(
          request.params.id,
          request.auth.credentials.id,
          request.payload
        );
      } catch (error) {
        console.log(error);
        return Boom.boomify(error, { statusCode: error.statusCode });
      }
    }
  }
};
