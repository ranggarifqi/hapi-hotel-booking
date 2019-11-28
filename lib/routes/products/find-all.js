"use strict";

const Joi = require("@hapi/joi");
const Boom = require('@hapi/boom');

module.exports = {
  method: "GET",
  path: "/products",
  options: {
    tags: ["api"],
    auth: 'jwt',
    validate: {
      query: {
        limit: Joi.number()
          .integer()
          .min(1)
          .default(10),
        offset: Joi.number()
          .integer()
          .min(0)
          .default(0)
      }
    },
    handler: async (request, h) => {
      const { limit, offset } = request.query;
      const { productService } = request.services();
      try {
        return await productService.findAll({ limit, offset })
      } catch (error) {
        return Boom.badRequest(error.message);
      }
    }
  }
};
