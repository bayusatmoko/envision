

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdayDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isProcessed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
