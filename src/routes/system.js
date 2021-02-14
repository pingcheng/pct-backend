const routes = require("express").Router();
const ApiResponse = require("../lib/ApiResponse");

routes.get("/", (req, res) => {
	res.send(ApiResponse.with({
		"time": Date.now(),
	}));
});

module.exports = routes;