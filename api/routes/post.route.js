import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
	create,
	deletePost,
	getPosts,
	updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getPosts", getPosts);
// router.get("/getFeaturedPosts", getFeaturedPosts);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);
router.put("/updatePost/:postId/:userId", verifyToken, updatePost);

export default router;
