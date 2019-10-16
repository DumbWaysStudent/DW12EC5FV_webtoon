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
  };
  return comics;
};