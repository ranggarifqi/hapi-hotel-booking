"use strict";

const Joi = require("@hapi/joi");
const Boom = require('@hapi/boom');

module.exports = {
  method: "PATCH",
  path: "/rooms/{id}",
  options: {
    tags: ["api"],
    auth: "jwt",
    plugins: { hapiAuthorization: { role: "Administrator" } },
    validate: {
      params: {
        id: Joi.number().integer()
      },
      payload: {
        roomTypeId: Joi.number().integer(),
        roomNumber: Joi.string()
      }
    },
    handler: async (request, h) => {
      try {
        const { roomService } = request.services();
        return await roomService.update(request.params.id, request.payload);
      } catch (error) {
        console.log(error)
        if (error.code === 'ER_DUP_ENTRY') {
          return Boom.boomify(new Error('Nomor Kamar tidak boleh ada yang sama'), { statusCode: 403 });
        }
        return Boom.boomify(error, { statusCode: error.statusCode });
      }
    }
  }
};
