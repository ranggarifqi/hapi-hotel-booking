"use strict";

const Schwifty = require("schwifty");
const Joi = require("@hapi/joi");

module.exports = class Rooms extends Schwifty.Model {
  static get tableName() {
    return "rooms";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer(),
      roomTypeId: Joi.number().integer(),
      roomNumber: Joi.string(),
      createdAt: Joi.date()
    }); // eslint-disable-line no-undef
  }

  static get relationMappings() {
    const Users = require("./Users");
    const RoomTypes = require("./RoomTypes");
    const Bookings = require("./Bookings");
    return {
      roomType: {
        relation: Schwifty.Model.BelongsToOneRelation,
        modelClass: RoomTypes,
        join: {
          from: "rooms.roomTypeId",
          to: "room_types.id"
        }
      },
      bookedBy: {
        relation: Schwifty.Model.ManyToManyRelation,
        modelClass: Users,
        join: {
          from: "rooms.id",
          through: {
            modelClass: Bookings,
            from: "bookings.roomId",
            to: "bookings.userId"
          },
          to: "users.id"
        }
      }
    };
  }
};
