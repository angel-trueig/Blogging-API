const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");


const PostRoute = require("./routes/blogRoutes.js");
const signupRoute = require("./routes/signupRoutes.js");
const loginRoute = require("./routes/loginRoutes.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.use(session({
    secret: "blog-secret-key",
    resave: false,
    saveUninitialized: false
}));



app.use("/posts", PostRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

app.get("/", (req, res) => {
    res.send("homePage");
})

app.listen(8080, () => {
    console.log("server listening");

});