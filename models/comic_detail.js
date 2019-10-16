'use strict';
module.exports = (sequelize, DataTypes) => {
  const comic_detail = sequelize.define('comic_detail', {
    title_episodes: DataTypes.STRING,
    imgurl_episodes: DataTypes.STRING,
    comic: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER
  }, {});
  comic_detail.associate = function(models) {

    // Digunakan untuk melihat pages sesuai chapter
    comic_detail.hasMany(models.episodes, {
      foreignKey : "title_id"
    })

    
  };
  return comic_detail;
};