"use strict";

const Schmervice = require("schmervice");
const { transaction } = require("objection");

module.exports = class BookingService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async create(payload, boundedBookings) {
    const { Rooms } = this.server.models();

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

  async update(id, userId, payload) {
    const { Bookings } = this.server.models();

    // Cek owner dari id ini.
    const booking = await Bookings.query().findById(id);
    if (!booking) {
      console.log("Data bookint tidak ada");
      const err = new Error("Data booking tidak ditemukan");
      err.statusCode = 404;
      throw err;
    }
    if (userId != booking.userId) {
      console.log("Bukan Owner");
      const err = new Error("Data booking tidak ditemukan");
      err.statusCode = 404;
      throw err;
    }

    // Cek Apakah tanggal sekarang sudah sama atau melebihi tanggal check in
    if (Date.now() >= booking.checkInAt) {
      console.log("Tanggal sudah melebihi");
      const err = new Error("Data booking tidak ditemukan");
      err.statusCode = 404;
      throw err;
    }

    // Cek tanggal, apakah kamar tersebut tersedia di rentang tanggal tsb
    const bookings = await Bookings.query()
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
    if (bookings.length > 1) {
      const err = new Error("Kamar tidak tersedia");
      err.statusCode = 400;
      throw err;
    } else if (bookings.length === 1) {
      // Fungsi ini untuk handling jika ingin pindah tanggal
      // Misal booking id 1 awalnya dari tanggal 4 Desember ~ 6 Desember
      // Lalu Ingin diganti menjadi tanggal 3 Desember ~ 5 Desember
      // Dan kebetulan, di tanggal 3 Desember, room dengan booking id 1 itu masih kosong, blm ada data booking yg lain
      // Sehingga fungsi ini berguna untuk Allow user update data booking tsb
      if (bookings[0].id !== id) {
        const err = new Error("Kamar tidak tersedia");
        err.statusCode = 400;
        throw err;
      }
    }

    return await Bookings.query().patchAndFetchById(id, payload);
  }
};
