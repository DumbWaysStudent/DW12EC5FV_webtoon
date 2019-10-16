'use strict';
module.exports = (sequelize, DataTypes) => {
  const episodes = sequelize.define('episodes', {
    title_id: DataTypes.INTEGER,
    episodes_img: DataTypes.STRING,
    pages: DataTypes.INTEGER
  }, {});
  episodes.associate = function(models) {
    // associations can be defined here
  };
  return episodes;
};