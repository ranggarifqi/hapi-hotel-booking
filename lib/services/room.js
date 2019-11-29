"use strict";

const Schmervice = require("schmervice");

module.exports = class RoomService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async findAll({ limit, offset }) {
    const { Rooms } = this.server.models();
    const baseQuery = Rooms.query();

    const [results, totalItems] = await Promise.all([
      baseQuery
        .limit(limit)
        .offset(offset)
        .orderBy("id", "desc"),
      baseQuery.resultSize()
    ]);

    return { results, totalItems, limit, offset };
  }

  async findById(id) {
    const { Rooms } = this.server.models();
    return await Rooms.query()
      .throwIfNotFound()
      .findById(id);
  }

  async findAvailableRoom(checkInAt) {
    const { Bookings, Rooms } = this.server.models();
    // Cek Booking dengan tanggal checkin
    const bookings = await Bookings.query()
      .where("checkInAt", '<=', checkInAt)
      .where("checkOutAt", '>', checkInAt);

    let res = Rooms.query();
    // Jika tidak ada, maka semua kamar = available
    if (bookings.length === 0) {
      res = await res.eager("roomType");
    } else {
      for (let v of bookings) {
        res.where("id", "<>", v.roomId);
      }
      res = await res.eager("roomType");
    }

    return {
      totalData: res.length,
      results: res
    };
  }

  async create(payload) {
    const { Rooms, RoomTypes } = this.server.models();
    // Cek dulu apakah qty nya tidak berlebih
    const type = await RoomTypes.query()
      .findById(payload.roomTypeId)
      .eager("rooms");

    if (!type) {
      const err = new Error("Tipe kamar tidak tersedia");
      err.statusCode = 404;
      throw err;
    }
    if (type.rooms.length >= type.qty) {
      const err = new Error("Jumlah kamar sudah maksimum");
      err.statusCode = 403;
      throw err;
    }

    return await Rooms.query().insertAndFetch(payload);
  }

  async update(id, payload) {
    const { Rooms, RoomTypes } = this.server.models();

    // Jika hendak ganti tipe kamar, maka cek & ricek terlebih dahulu
    if (payload.roomTypeId) {
      const type = await RoomTypes.query()
        .findById(payload.roomTypeId)
        .eager("rooms");

      if (!type) {
        const err = new Error("Tipe kamar tidak tersedia");
        err.statusCode = 404;
        throw err;
      }
      if (type.rooms.length >= type.qty) {
        const err = new Error("Jumlah kamar sudah maksimum");
        err.statusCode = 403;
        throw err;
      }
    }

    return await Rooms.query().patchAndFetchById(id, payload);
  }

  async delete(id) {
    const { Rooms } = this.server.models();
    return await Rooms.query()
      .deleteById(id)
      .returning("*");
  }
};
