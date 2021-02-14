import { Router } from "express";
import { ApiResponse } from "../../lib/ApiResponse";
import { PostController } from "../../controllers/posts/PostController";

const postsRoutes = Router();

postsRoutes.get("/", async (req, res) => {
    res.send(ApiResponse.with(await PostController.handle(req)));
});

export default postsRoutes;