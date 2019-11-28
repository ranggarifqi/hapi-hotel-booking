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
