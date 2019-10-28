const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const database = new Sequelize('blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// database.sync({force: true});

module.exports = {
  database: database,
  models: {
    User: database.define('user',{
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
      }
    }),
    Blog: database.define("Blog",{
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      }
    }),
  }
}