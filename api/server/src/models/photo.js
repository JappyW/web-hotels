/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('photo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    studio_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'studios',
        key: 'id'
      }
    }
  }, {
    tableName: 'photo'
  });
};
