import express from "express";
import serverless from "serverless-http";
import systemRoutes from "./routes/system";
import { ApiResponse } from "./lib/ApiResponse";
import postsRoutes from "./routes/posts/postsRoutes";
import postCategoriesRoutes from "./routes/posts/postCategoriesRoutes";

const app = express();

app.get("/", (req, res) => {
    res.send(ApiResponse.with(null, "Hello from Ping Cheng"));
});

app.use("/posts", postsRoutes);
app.use("/postCategories", postCategoriesRoutes);
app.use("/system", systemRoutes);

export const handler = serverless(app);