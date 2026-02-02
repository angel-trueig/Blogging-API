import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import methodOverride from "method-override";
import errorMiddleware from "./src/rest-resources/middleware/errorHandler.js";

import PostRoute from "./src/rest-resources/routes/postRoutes.js";
import signupRoute from "./src/rest-resources/routes/signupRoutes.js";
import loginRoute from "./src/rest-resources/routes/loginRoutes.js";
import commentRoutes from "./src/rest-resources/routes/commentRoutes.js";
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(cookieParser());



app.use("/posts", PostRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

app.get("/", (req, res) => {
    res.send("homePage");
})

app.use(errorMiddleware);



import initDb from "./src/db/models/index.js";

initDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server listening");
    });
}).catch((err) => {
    console.log(err);
});