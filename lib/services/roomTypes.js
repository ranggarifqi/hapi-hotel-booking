'use strict';

const Schmervice = require('schmervice');

module.exports = class RoomTypeService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async findAll({ limit, offset }) {
    const { RoomTypes } = this.server.models();
    const baseQuery = RoomTypes.query();

    const [ results, totalItems ] = await Promise.all([
      baseQuery.limit(limit).offset(offset).orderBy('id', 'desc'),
      baseQuery.resultSize()
    ]);
    
    return { results, totalItems, limit, offset };
  }

  async findById(id) {
    const { RoomTypes } = this.server.models();
    return await RoomTypes.query().throwIfNotFound().findById(id);
  }

  async create(payload) {
    const { RoomTypes } = this.server.models();
    return await RoomTypes.query().insertAndFetch(payload);
  }

  async update(id, payload) {
    const { RoomTypes } = this.server.models();
    return await RoomTypes.query().patchAndFetchById(id, payload);
  }

  async delete(id) {
    const { RoomTypes } = this.server.models();
    return await RoomTypes.query().deleteById(id).returning('*');
  }
};
