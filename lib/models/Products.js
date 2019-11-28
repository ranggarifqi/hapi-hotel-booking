"use strict";

const Schwifty = require("schwifty");
const Joi = require("@hapi/joi");

module.exports = class Products extends Schwifty.Model {
  static get tableName() {
    return "Products";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      name: Joi.string(),
      sku: Joi.string(),
      image: Joi.string(),
      description: Joi.string(),
      price: Joi.number()
    }); // eslint-disable-line no-undef
  }
};
