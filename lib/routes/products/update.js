"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  method: "PATCH",
  path: "/products/{id}",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      params: {
        id: Joi.number().integer()
      },
      payload: {
        name: Joi.string(),
        sku: Joi.string(),
        image: Joi.string(),
        description: Joi.string(),
        price: Joi.number()
      }
    },
    handler: async (request, h) => {
      try {
        const { productService } = request.services();
        return await productService.update(request.params.id, request.payload);
      } catch (error) {
        const { errorService } = request.services();
        return errorService.errorHandler(error, h);
      }
    }
  }
};
