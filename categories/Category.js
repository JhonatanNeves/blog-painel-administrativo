const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

/*Category.sync({force: true});*/  /* APÓS CRIAR A TABELA , IMPORTANTE DELETAR A LINHA DE CODIGO*/

module.exports = Category;