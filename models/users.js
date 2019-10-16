'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here

    // Untuk melihat comic yang di favoritekan user
    users.belongsToMany(models.comics, {
      through : "myfavorites",
      as : "My Favorite",
      foreignKey : "user_id"
    })
  };
  return users;
};