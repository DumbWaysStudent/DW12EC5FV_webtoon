'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comic_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title_episodes: {
        type: Sequelize.STRING
      },
      imgurl_episodes: {
        type: Sequelize.STRING
      },
      comic: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references :{
          model : 'comics',
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comic_details');
  }
};