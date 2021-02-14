import { Router } from "express";

const systemRoutes = Router();

systemRoutes.get("/", (req, res) => {
    res.send({
        "time": Date.now()
    })
});

export default systemRoutes;