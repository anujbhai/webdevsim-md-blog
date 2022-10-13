require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const connectDB = require("./config/dbConn");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

// Connect to MongoDB
connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({createdAt: "desc"});

  res.render("articles/index", {articles: articles});
});

app.use("/articles", articleRouter);

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established");
  app.listen(5000, () => console.log("Server started on 5000"));
});
