
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('room_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('room_types').insert([
        {
          id: 1,
          name: 'Mawar',
          description: 'Kamar bertipe mawar',
          image: 'image',
          qty: '3',
          price: 500000
        },
        {
          id: 2,
          name: 'Melati',
          description: 'Kamar bertipe melati',
          image: 'image',
          qty: '5',
          price: 300000
        },
        {
          id: 3,
          name: 'Anggrek',
          description: 'Kamar bertipe anggrek',
          image: 'image',
          qty: '2',
          price: 700000
        },
      ]);
    });
};
