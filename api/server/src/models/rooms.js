/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    studioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'studio_id',
      references: {
        model: 'studios',
        key: 'id'
      }
    },
    roomTypeId: {
      type: DataTypes.INTEGER,
      field: 'room_type_id',
      allowNull: true,
      references: {
        model: 'room_type',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.NUMERIC,
      allowNull: true
    },
    roomNumber: {
      type: DataTypes.INTEGER,
      field: 'room_number',
      allowNull: false,
    },
  }, {
    tableName: 'rooms'
  });
};
