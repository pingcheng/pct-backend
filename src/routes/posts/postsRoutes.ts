import { Router } from "express";
import { ApiResponse } from "../../lib/ApiResponse";
import { PostController } from "../../controllers/posts/PostController";

const postsRoutes = Router();

postsRoutes.get("/", async (req, res) => {
    res.send(ApiResponse.with(await PostController.list(req)));
});

postsRoutes.get("/:slug", PostController.getPostBySlug);

export default postsRoutes;