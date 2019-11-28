'use strict';

const Schmervice = require('schmervice');

module.exports = class BookingService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async create(payload) {
    const { Bookings, Rooms } = this.server.models();

    // Cek apakah kamar dengan id tersebut ada
    const room = await Rooms.query().findById(payload.roomId);
    if (!room) {
      const err = new Error('Kamar tidak tersedia');
      err.statusCode = 400;
      throw err;
    }

    // Cek apakah sudah ada yg booking di range tanggal tersebut
    const bookings = await Bookings
      .query()
      .where('roomId', payload.roomId)
      .where('checkInAt', '<=', payload.checkInAt)
      .where('checkOutAt', '>', payload.checkInAt); // Operator nya = '>', karena customer sebelumnya akan check out di hari tsb.
    
    // Jika ada, maka tolak
    if (bookings.length > 0) {
      const err = new Error('Kamar tidak tersedia');
      err.statusCode = 400;
      throw err;
    }

    return await Bookings.query().insertAndFetch(payload);
  }
};
