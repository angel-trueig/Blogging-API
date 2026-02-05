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
import subscriptionRoutes from "./src/rest-resources/routes/subscriptionRoutes.js";
import authorRankingRoutes from "./src/rest-resources/routes/authorRankingRoutes.js";
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import logger from "./src/libs/logger.js";
import initDb from "./src/db/models/index.js";
//socket
import http from "http";
import { initSocketServer } from "./src/socket-resources/socketServer.js";

const app = express();

app.use(
    morgan("dev", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(cookieParser());



app.use("/posts", PostRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/feed", subscriptionRoutes);
app.use("/author", authorRankingRoutes);



app.use(errorMiddleware);


//socket
const server = http.createServer(app);
initSocketServer(server);


initDb().then(() => {
    server.listen(process.env.PORT, () => {
        console.log("server + socket listening");
    });
}).catch((err) => {
    console.log(err);
});

export default app;