import { Router } from "express";
import { ApiResponse } from "../lib/ApiResponse";

const rootRoutes = Router();

rootRoutes.get("", ((req, res) => {
    res.send(ApiResponse.with(null, "Hello from Ping Cheng"));
}));

export default rootRoutes;