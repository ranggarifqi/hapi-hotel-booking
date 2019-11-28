
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rooms').del()
    .then(function () {
      // Inserts seed entries
      return knex('rooms').insert([
        { roomTypeId: 1, roomNumber: '100' },
        { roomTypeId: 1, roomNumber: '101' },
        { roomTypeId: 1, roomNumber: '102' },
        { roomTypeId: 2, roomNumber: '200' },
        { roomTypeId: 2, roomNumber: '201' },
        { roomTypeId: 2, roomNumber: '202' },
        { roomTypeId: 2, roomNumber: '203' },
        { roomTypeId: 2, roomNumber: '204' },
        { roomTypeId: 3, roomNumber: '300' },
        { roomTypeId: 3, roomNumber: '301' },
      ]);
    });
};
