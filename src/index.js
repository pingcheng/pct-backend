const serverless = require("serverless-http");
const express = require("express");
const app = express();
const isLambda = !!process.env.LAMBDA_TASK_ROOT;

const ApiResponse = require("./lib/ApiResponse");
const systemRoutes = require("./routes/system");

app.get("/", (req, res) => {
    res.send(ApiResponse.with(null, "hello, world"));
});

app.use("/system", systemRoutes);

module.exports.handler = serverless(app);

if (!isLambda) {
    app.listen(3000);
}