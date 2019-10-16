'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('myfavorites', [{
        user_id: 1,
        comic_id: 1
      }, {
        user_id: 1,
        comic_id: 2
      }, {
        user_id: 2,
        comic_id: 4
      }], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('People', null, {});
  }
};
