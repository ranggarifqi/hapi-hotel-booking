"use strict";

const Joi = require("@hapi/joi").extend(require('@hapi/joi-date'));
const Boom = require("@hapi/boom");

module.exports = {
  method: "POST",
  path: "/bookings",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      payload: {
        roomIds: Joi.array().items(Joi.number().integer()).required(),
        checkInAt: Joi.date().format('YYYY-MM-DD').required(),
        checkOutAt: Joi.date().format('YYYY-MM-DD').required()
      }
    },
    handler: async (request, h) => {
      try {
        const { bookingService } = request.services();
        request.payload.userId = request.auth.credentials.id;
        const res = await bookingService.multipleBooking(request.payload);
        return res;
      } catch (error) {
        console.log(error);
        return Boom.boomify(error, { statusCode: error.statusCode });
      }
    }
  }
};
