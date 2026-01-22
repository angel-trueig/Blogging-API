const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const PostRoute = require("./routes/blogRoutes.js");
const methodOverride = require("method-override");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));



app.use("/posts", PostRoute);

app.get("/", (req, res) => {
    res.render("homePage");
})

app.listen(8080, () => {
    console.log("server listening");

});