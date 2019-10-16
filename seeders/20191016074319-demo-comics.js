'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('comics', [{
        title: 'Naruto',
        genre: "action",
        isFavorite : false,
        createdBy : 1,
        imgurl : 'http://www.imagebam.com/image/70a5ed1323051251'
      }, {
        title: 'Onc Piece',
        genre: "action",
        isFavorite : false,
        createdBy : 1,
        imgurl: 'http://www.imagebam.com/image/4f0b3d1323051260'
      }, {
        title: 'Bleach',
        genre: "action",
        isFavorite : false,
        createdBy : 2,
        imgurl: 'http://www.imagebam.com/image/bf4fbe1323051236'
      }, {
        title: 'one Punch Man',
        genre: "action",
        isFavorite : false,
        createdBy : 1,
        imgurl : 'http://www.imagebam.com/image/fc83191323051266'
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('People', null, {});

  }
};
