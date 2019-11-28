"use strict";

const Schwifty = require("schwifty");
const Joi = require("@hapi/joi");

const Roles = require("./Roles");

module.exports = class Users extends Schwifty.Model {
  static get tableName() {
    return "users";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      email: Joi.string().email(),
      password: Joi.string(),
      fullName: Joi.string(),
      roleId: Joi.number().integer()
    }); // eslint-disable-line no-undef
  }

  static relationMappings = {
    role: {
      relation: Schwifty.Model.BelongsToOneRelation,
      modelClass: Roles,
      join: {
        from: "users.roleId",
        to: "roles.id"
      }
    }
  };
};
