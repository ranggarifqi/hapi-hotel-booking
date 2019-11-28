"use strict";

const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

module.exports = {
  method: "GET",
  path: "/room_types/{id}",
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
      const { roomTypeService } = request.services();
      try {
        return await roomTypeService.findById(id);
      } catch (error) {
        console.log(error);
        return Boom.boomify(error, { statusCode: error.statusCode });
      }
    }
  }
};
