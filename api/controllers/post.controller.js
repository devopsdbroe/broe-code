import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
	if (!req.user.isAdmin) {
		return next(errorHandler(403, "You are not allowed to create a post"));
	}

	// Check to make sure user fills out all required fields
	if (!req.body.title || !req.body.content || !req.body.author) {
		return next(errorHandler(400, "Please provide all required fields"));
	}

	// Create slug for post URL
	const slug = req.body.title
		.split(" ")
		.join("-")
		.toLowerCase()
		.replace(/[^a-zA-Z0-9-]/g, "");

	const newPost = new Post({
		...req.body,
		slug,
		userId: req.user.id,
	});

	try {
		const savedPost = await newPost.save();
		res.status(201).json(savedPost);
	} catch (error) {
		next(error);
	}
};

export const getPosts = async (req, res, next) => {
	try {
		const startIndex = parseInt(req.query.startIndex) || 0;
		const limit = parseInt(req.query.limit) || 9;
		const sortDirection = req.query.order === "asc" ? 1 : -1;
		// Search posts based on query parameters
		const posts = await Post.find({
			// Only search is query parameter exists in URL
			...(req.query.userId && { userId: req.query.userId }),
			...(req.query.category && { category: req.query.category }),
			...(req.query.isFeatured && { isFeatured: req.query.isFeatured }),
			...(req.query.slug && { slug: req.query.slug }),
			...(req.query.postId && { _id: req.query.postId }),
			...(req.query.searchTerm && {
				$or: [
					{ title: { $regex: req.query.searchTerm, $options: "i" } },
					{ author: { $regex: req.query.searchTerm, $options: "i" } },
					{ content: { $regex: req.query.searchTerm, $options: "i" } },
				],
			}),
		})
			.sort({ updatedAt: sortDirection })
			.skip(startIndex)
			.limit(limit);

		// Get total posts in DB
		const totalPosts = await Post.countDocuments();

		// Calculate one month ago to get posts from last month
		const now = new Date();
		const oneMonthAgo = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			now.getDate()
		);
		const lastMonthPosts = await Post.countDocuments({
			createdAt: { $gte: oneMonthAgo },
		});

		// Return all posts, total posts, and total posts in the last month
		res.status(200).json({
			posts,
			totalPosts,
			lastMonthPosts,
		});
	} catch (error) {
		next(error);
	}
};

export const deletePost = async (req, res, next) => {
	// Check if user is owner of the post and is an admin
	if (!req.user.isAdmin || req.user.id !== req.params.userId) {
		return next(errorHandler(403, "You are not allowed to delete this post"));
	}

	try {
		await Post.findByIdAndDelete(req.params.postId);
		res.status(200).json("Post has been deleted");
	} catch (error) {
		next(error);
	}
};

export const updatePost = async (req, res, next) => {
	if (!req.user.isAdmin || req.user.id !== req.params.userId) {
		return next(errorHandler(403, "You are not allowed to update this post"));
	}

	try {
		const updatedPost = await Post.findByIdAndUpdate(
			req.params.postId,
			{
				$set: {
					title: req.body.title,
					author: req.body.author,
					content: req.body.content,
					category: req.body.category,
					image: req.body.image,
					isFeatured: req.body.isFeatured,
				},
			},
			{ new: true }
		);
		res.status(200).json(updatedPost);
	} catch (error) {
		next(error);
	}
};

// Fetch the 3 most recently updated posts with isFeatured marked as true
export const getFeaturedPosts = async (req, res, next) => {
	try {
		const featuredPosts = await Post.find({
			isFeatured: true,
		})
			.sort({ updatedAt: -1 })
			.limit(3);
		res.status(200).json(featuredPosts);
	} catch (error) {
		next(error);
	}
};
