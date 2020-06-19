/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room_comforts', {
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rooms',
        key: 'id'
      },
    },
    comfort_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'comforts',
        key: 'id'
      }
    },
  }, {
    tableName: 'room_comforts'
  });
};
