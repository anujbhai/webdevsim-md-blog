require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const articleRouter = require("./routes/articles");
const app = express();

// Connect to MongoDB
connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use("/articles/", articleRouter);

app.get("/", (req, res) => {
  const articles = [{
    title: "Test article",
    createdAt: new Date(),
    description: "Test description",
  }, {
    title: "Test article 2",
    createdAt: new Date(),
    description: "Test description 2",
  }];

  res.render("articles/index", {articles: articles});
});

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established");
  app.listen(5000, () => console.log("Server started on 5000"));
});
