module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      userId: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING(64),
        defaultValue: "user",
      },
      lastName: {
        type: Sequelize.STRING(64),
        defaultValue: "zwallet",
      },
      userName: {
        type: Sequelize.STRING(20),
        defaultValue: "User",
      },
      email: {
        type: Sequelize.STRING(64),
      },
      password: {
        type: Sequelize.STRING(64),
      },
      pin: {
        type: Sequelize.INTEGER(6)
      },
      balance: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },
      role: {
        type: Sequelize.ENUM,
        values: ["admin", "user"],
        defaultValue: "user",
      },
      phone: {
        type: Sequelize.STRING(14),
        defaultValue: "0",
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue:
          "https://img.freepik.com/free-vector/coffee-love-foam-with-beans-cartoon-icon-illustration_138676-2575.jpg",
      }
    });
  
    return User;
  };
  