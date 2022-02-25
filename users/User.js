const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

/*User.sync({force: false});*/
/*Category.sync({force: true});*/  /* APÓS CRIAR A TABELA , IMPORTANTE DELETAR A LINHA DE CODIGO*/

module.exports = User