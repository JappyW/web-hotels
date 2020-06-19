/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addresses', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    house: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latLong: {
      type: DataTypes.STRING,
      field: 'lat_lng',
      allowNull: false
    },
  }, {
    tableName: 'addresses'
  });
};
