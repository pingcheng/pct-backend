import { Router } from "express";
import { ApiResponse } from "../lib/ApiResponse";

const systemRoutes = Router();

systemRoutes.get("/", (req, res) => {
    res.send(ApiResponse.with({
        "time": Date.now()
    }));
});

export default systemRoutes;