'use strict';

const Schmervice = require('schmervice');

module.exports = class RoomService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async findAll({ limit, offset }) {
    const { Rooms } = this.server.models();
    const baseQuery = Rooms.query();

    const [ results, totalItems ] = await Promise.all([
      baseQuery.limit(limit).offset(offset).orderBy('id', 'desc'),
      baseQuery.resultSize()
    ]);
    
    return { results, totalItems, limit, offset };
  }

  async findById(id) {
    const { Rooms } = this.server.models();
    return await Rooms.query().throwIfNotFound().findById(id);
  }

  async findAvailableRoom(checkInAt) {
    const { Bookings, Rooms } = this.server.models();
    // Cek Booking dengan tanggal checkin
    const bookings = await Bookings.query().where('checkInAt', checkInAt);

    let res = Rooms.query();
    // Jika tidak ada, maka semua kamar = available
    if (bookings.length === 0) {
      res = await res;
    } else {
      for (let v of bookings) {
        res.where('id', '<>', v.roomId);
      }
      res = await res;
    }

    return {
      totalData: res.length,
      results: res,
    }
  }

  async create(payload) {
    const { Rooms } = this.server.models();
    return await Rooms.query().insertAndFetch(payload);
  }

  async update(id, payload) {
    const { Rooms } = this.server.models();
    return await Rooms.query().patchAndFetchById(id, payload);
  }

  async delete(id) {
    const { Rooms } = this.server.models();
    return await Rooms.query().deleteById(id).returning('*');
  }
};
