"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  method: "POST",
  path: "/products",
  options: {
    tags: ["api"],
    auth: "jwt",
    validate: {
      payload: {
        name: Joi.string().required(),
        sku: Joi.string().required(),
        image: Joi.string(),
        description: Joi.string(),
        price: Joi.number().required()
      }
    },
    handler: async (request, h) => {
      try {
        const { productService } = request.services();
        return await productService.create(request.payload);
      } catch (error) {
        const { errorService } = request.services();
        return errorService.errorHandler(error, h);
      }
    }
  }
};
