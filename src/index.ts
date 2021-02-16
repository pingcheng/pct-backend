import express from "express";
import serverless from "serverless-http";
import systemRoutes from "./routes/system";
import postsRoutes from "./routes/posts/postsRoutes";
import postCategoriesRoutes from "./routes/posts/postCategoriesRoutes";
import { enableCors } from "./routes/cors";
import rootRoutes from "./routes/root";

const app = express();

// Enable the CORS
app.use(enableCors);

// Register routes
app.use("/", rootRoutes);
app.use("/posts", postsRoutes);
app.use("/postCategories", postCategoriesRoutes);
app.use("/system", systemRoutes);

export const handler = serverless(app);