'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('comic_details', [{
        title_episodes : 'Ep. 1',
        imgurl_episodes : 'https://www.example.com',
        comic : 1,
        chapter_id : 1
      }, {
        title_episodes : 'Ep. 2',
        imgurl_episodes : 'https://www.example.com',
        comic : 1,
        chapter_id : 2
      }, {
        title_episodes : 'Ep. 3',
        imgurl_episodes : 'https://www.example.com',
        comic : 1,
        chapter_id : 3
      }, {
        title_episodes : 'Ep. 4',
        imgurl_episodes : 'https://www.example.com',
        comic : 1,
        chapter_id : 4
      }, {
        title_episodes : 'Ep. 5',
        imgurl_episodes : 'https://www.example.com',
        comic : 1,
        chapter_id : 5
      }, {
        title_episodes : 'Ep. 1',
        imgurl_episodes : 'https://www.example.com',
        comic : 2,
        chapter_id : 1
      }, {
        title_episodes : 'Ep. 2',
        imgurl_episodes : 'https://www.example.com',
        comic : 2,
        chapter_id : 2
      }, {
        title_episodes : 'Ep. 3',
        imgurl_episodes : 'https://www.example.com',
        comic : 2,
        chapter_id : 3
      }, {
        title_episodes : 'Ep. 4',
        imgurl_episodes : 'https://www.example.com',
        comic : 2,
        chapter_id : 4
      }, {
        title_episodes : 'Ep. 5',
        imgurl_episodes : 'https://www.example.com',
        comic : 2,
        chapter_id : 5
      }, {
        title_episodes : 'Ep. 1',
        imgurl_episodes : 'https://www.example.com',
        comic : 3,
        chapter_id : 1
      }, {
        title_episodes : 'Ep. 2',
        imgurl_episodes : 'https://www.example.com',
        comic : 3,
        chapter_id : 2
      }, {
        title_episodes : 'Ep. 3',
        imgurl_episodes : 'https://www.example.com',
        comic : 3,
        chapter_id : 3
      }, {
        title_episodes : 'Ep. 4',
        imgurl_episodes : 'https://www.example.com',
        comic : 3,
        chapter_id : 4
      }, {
        title_episodes : 'Ep. 1',
        imgurl_episodes : 'https://www.example.com',
        comic : 4,
        chapter_id : 1
      }, {
        title_episodes : 'Ep. 2',
        imgurl_episodes : 'https://www.example.com',
        comic : 2,
        chapter_id : 2
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('comic_details', null, {});

  }
};
