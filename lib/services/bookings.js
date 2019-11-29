"use strict";

const Schmervice = require("schmervice");
const { transaction } = require("objection");

module.exports = class BookingService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async create(payload, boundedBookings) {
    const { Bookings, Rooms } = this.server.models();

    // Cek apakah kamar dengan id tersebut ada
    const room = await Rooms.query().findById(payload.roomId);
    if (!room) {
      const err = new Error("Kamar tidak tersedia");
      err.statusCode = 400;
      throw err;
    }

    // Cek apakah sudah ada yg booking di range tanggal tersebut
    const bookings = await boundedBookings
      .query()
      .where("roomId", payload.roomId)
      .where(builder => {
        builder
          .whereBetween("checkInAt", [payload.checkInAt, payload.checkOutAt])
          .orWhereBetween("checkOutAt", [payload.checkInAt, payload.checkOutAt])
          .orWhere(builder2 => {
            builder2
              .where("checkInAt", "<=", payload.checkInAt)
              .where("checkOutAt", ">", payload.checkInAt)
              .where("checkInAt", "<=", payload.checkOutAt)
              .where("checkOutAt", ">", payload.checkOutAt);
          });
      });

    // Jika ada, maka tolak
    if (bookings.length > 0) {
      const err = new Error("Kamar tidak tersedia");
      err.statusCode = 400;
      throw err;
    }

    return await boundedBookings.query().insertAndFetch(payload);
  }

  async multipleBooking(payload) {
    const { Bookings } = this.server.models();
    const newPayload = payload.roomIds.map(v => ({
      userId: payload.userId,
      roomId: v,
      checkInAt: payload.checkInAt,
      checkOutAt: payload.checkOutAt
    }));

    try {
      const res = await transaction(Bookings, async BoundedBookings => {
        const resArr = [];
        for (let v of newPayload) {
          const newBooking = await this.create(v, BoundedBookings);
          resArr.push(newBooking);
        }
        return resArr;
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const { Bookings } = this.server.models();
    return await Bookings.query().deleteById(id);
  }
};
