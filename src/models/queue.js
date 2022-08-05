

module.exports = (sequelize, DataTypes) => {
    const Queue = sequelize.define(
      'Queue',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        birthdaySendTime: {
          type: DataTypes.DATE
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: ''
        }
      }
    );
    Queue.associate = function (models) {
      // associations can be defined here
    };
    return Queue;
  };
  