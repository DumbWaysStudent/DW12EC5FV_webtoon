'use strict';
module.exports = (sequelize, DataTypes) => {
  const comic_detail = sequelize.define('comic_detail', {
    title_episodes: DataTypes.STRING,
    imgurl_episodes: DataTypes.STRING,
    comic: DataTypes.INTEGER
  }, {});
  comic_detail.associate = function(models) {
    // associations can be defined here
  };
  return comic_detail;
};