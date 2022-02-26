const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesControllerr");
const usersController = require("./users/UsersController");
const User = require("./users/User");
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const session = require("express-session");


// View engine
app.set('view engine', 'ejs');

// Session

app.use(session({
    secret:"dsfhs5g84f5664asets56a187a ", cookie: { maxAge: 30000000 },resave: true,
    saveUninitialized: true
}));

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database

connection
    .authenticate()
    .then(() => {
        console.log("Connection Sucess!");
    }).catch((error) =>{
        console.log(error);
    }) 

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);





app.get("/", (req, res) => {

    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    });
})

            
app.get("/:slug",(req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    });
})

app.get("/category/:slug",(req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
})

app.listen(3000, () => {
    console.log("The server is running!")
})