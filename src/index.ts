import express from "express";
import serverless from "serverless-http";
import systemRoutes from "./routes/system";
import { ApiResponse } from "./lib/ApiResponse";
import postsRoutes from "./routes/posts/postsRoutes";
import postCategoriesRoutes from "./routes/posts/postCategoriesRoutes";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    res.send(ApiResponse.with(null, "Hello from Ping Cheng"));
});

app.use("/posts", postsRoutes);
app.use("/postCategories", postCategoriesRoutes);
app.use("/system", systemRoutes);

export const handler = serverless(app);