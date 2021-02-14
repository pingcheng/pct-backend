import express from "express";
import serverless from "serverless-http";
import systemRoutes from "./routes/system";

const app = express();

app.get("/", (req, res) => {
    res.send({
        message: "Hello from ping cheng"
    });
});

app.use("/system", systemRoutes)

export const handler = serverless(app);