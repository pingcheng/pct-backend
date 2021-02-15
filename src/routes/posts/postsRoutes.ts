import { Router } from "express";
import { ApiResponse } from "../../lib/ApiResponse";
import { PostController } from "../../controllers/posts/PostController";

const postsRoutes = Router();

postsRoutes.get("/", async (req, res) => {
    res.send(ApiResponse.with(await PostController.list(req)));
});

postsRoutes.get("/:slug", async (req, res) => {
    const post = await PostController.getPostBySlug(req, req.params.slug);

    if (post === null) {
        res.status(404).send(ApiResponse.with(null, `Post with slug ${req.params.slug} is not found`));
        return;
    }

    res.send(ApiResponse.with(post));
});

export default postsRoutes;