'use strict';
module.exports = (sequelize, DataTypes) => {
  const comics = sequelize.define('comics', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    imgurl: DataTypes.STRING
  }, {});
  comics.associate = function(models) {
    // Digunakan untuk melihat siapa yg membuat comic
    comics.belongsTo(models.users, {
      foreignKey: 'createdBy'
    })

    // Digunakna untuk melihat chapter dari comic
    comics.hasMany(models.comic_detail, {
      as : 'episodes',
      foreignKey : 'comic'
    })

    // Digunakan untuk melihat siapa saja user yang memfavoritekan comic
    comics.belongsToMany(models.users, {
      through : "myfavorites",
      as : "User Favorite",
      foreignKey : "comic_id"

    })
  };
  return comics;
};