"use strict";

const Schwifty = require("schwifty");
const Joi = require("@hapi/joi");

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

  static get relationMappings() {
    const Roles = require("./Roles");
    const Rooms = require("./Rooms");
    const Bookings = require("./Bookings");
    return {
      role: {
        relation: Schwifty.Model.BelongsToOneRelation,
        modelClass: Roles,
        join: {
          from: "users.roleId",
          to: "roles.id"
        }
      },
      bookedRooms: {
        relation: Schwifty.Model.ManyToManyRelation,
        modelClass: Rooms,
        join: {
          from: "users.id",
          through: {
            modelClass: Bookings,
            from: "bookings.userId",
            to: "bookings.roomId"
          },
          to: "rooms.id"
        }
      }
    };
  }
};
