const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article); // Uma Categotia tem muitos artigos
Article.belongsTo(Category); // Um Artigo pertence a uma categoria

/*Article.sync({force: true});*/ /* APÓS CRIAR A TABELA , IMPORTANTE DELETAR A LINHA DE CODIGO*/

module.exports = Article;