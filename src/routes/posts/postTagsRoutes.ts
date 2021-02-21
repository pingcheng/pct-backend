import {Router} from "express";
import {PostTagsController} from "../../controllers/posts/PostTagsController";

const postTagsRoutes = Router();

postTagsRoutes.get("/", PostTagsController.list);

export default postTagsRoutes;