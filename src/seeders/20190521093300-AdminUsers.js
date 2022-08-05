

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Maulana Bayu',
        lastName: 'Satmoko',
        email: 'bsatmoko@gmail.com',
        birthdayDate: '1996-12-09',
        location: "Asia/Jakarta"
      },
      {
        firstName: 'Maulana Aji',
        lastName: 'Satrio',
        email: 'masatrio@gmail.com',
        birthdayDate: '1996-12-09',
        location: "Asia/Jakarta"
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
