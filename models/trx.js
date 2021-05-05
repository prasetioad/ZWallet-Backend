module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("trx", {
      userId: {
        type: Sequelize.STRING,
      },
      destId:{
        type: Sequelize.STRING,
      },
      sender:{
        type: Sequelize.STRING(18),
      },
      receiver:{
        type: Sequelize.STRING(18),
      },
      amount: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
      },
      balance: {
          type: Sequelize.INTEGER(11),
          defaultValue: 0,
      },
      dateTime:{
        type: Sequelize.DATE,
      },
      notes:{
          type: Sequelize.STRING(48)
      },
      avatar:{
        type:Sequelize.STRING
      },
      desc:{
        type: Sequelize.STRING(11),
        value: ["Transfer", "Subscription"],
        defaultValue: 'Transfer'
      }
    });
  
    return User;
  };
  