'use strict';
module.exports = (sequelize, DataTypes) => {
  const myFavorite = sequelize.define('myFavorite', {
    user_id: DataTypes.INTEGER,
    comic_id: DataTypes.INTEGER
  }, {});
  myFavorite.associate = function(models) {
    // associations can be defined here
  };
  return myFavorite;
};