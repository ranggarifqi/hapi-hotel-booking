'use strict';

const Schmervice = require('schmervice');

module.exports = class ProductService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async findAll({ limit, offset }) {
    const { Products } = this.server.models();
    const baseQuery = Products.query();

    const [ products, totalItems ] = await Promise.all([
      baseQuery.limit(limit).offset(offset).orderBy('id', 'desc'),
      baseQuery.resultSize()
    ]);
    
    return { products, totalItems, limit, offset };
  }

  async findById(id) {
    const { Products } = this.server.models();
    return await Products.query().throwIfNotFound().findById(id);
  }

  async create(payload) {
    const { Products } = this.server.models();
    return await Products.query().insertAndFetch(payload);
  }

  async update(id, payload) {
    const { Products } = this.server.models();
    return await Products.query().patchAndFetchById(id, payload);
  }

  async delete(id) {
    const { Products } = this.server.models();
    return await Products.query().deleteById(id).returning('*');
  }
};
