'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('users', [{
        name: 'virginia',
        password: "dewangga@gmail.com",
        email : "test"
      }, {
        name: 'dewangga',
        password: "virginia@gmail.com",
        email : "test"
      }, {
        name: 'kipas',
        password: "angin@gmail.com",
        email : "test"
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('users', null, {});

  }
};
