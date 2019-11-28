"use strict";

const Joi = require('@hapi/joi');

module.exports = {
  method: "GET",
  path: "/products/{id}",
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
      const { productService } = request.services();
      try {
        return await productService.findById(id);
      } catch (error) {
        const { errorService } = request.services();
        return errorService.errorHandler(error, h);
      }
    }
  }
};
