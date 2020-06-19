/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      field: 'created_at',
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      field: 'start_date',
      allowNull: true
    },
    finishDate: {
      type: DataTypes.DATEONLY,
      field: 'finish_date',
      allowNull: true
    },
    song: { 
      type: DataTypes.STRING, 
      get: function() {
          return JSON.parse(this.getDataValue('song'));
      }, 
      set: function(val) {
          return this.setDataValue('song', JSON.stringify(val));
      }
  },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    roomId: {
      type: DataTypes.INTEGER,
      field: 'room_id',
      allowNull: true,
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("CREATED", "PAID", "COMPLETED"),
      allowNull: false,
      defaultValue: "CREATED"
    }
  }, {
    tableName: 'orders'
  });
};
