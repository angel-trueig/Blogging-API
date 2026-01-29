const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const errorMiddleware = require("./src/rest-resources/middleware/error");


const PostRoute = require("./src/rest-resources/routes/blogRoutes.js");
const signupRoute = require("./src/rest-resources/routes/signupRoutes.js");
const loginRoute = require("./src/rest-resources/routes/loginRoutes.js");
const commentRoutes = require("./src/rest-resources/routes/commentRoutes.js");
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
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
    res.send("homePage");
})

app.use(errorMiddleware);

app.listen(8080, () => {
    console.log("server listening");

});