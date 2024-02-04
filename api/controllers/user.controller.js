import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
	res.json({ message: "API is working!" });
};

export const updateUser = async (req, res, next) => {
	// req.user.id coming from cookies via JWT
	if (req.user.id !== req.params.userId) {
		return next(errorHandler(403, "You are not allowed to update this user"));
	}

	// Check to make sure password is long enough
	if (req.body.password) {
		if (req.body.password.length < 6) {
			return next(errorHandler(400, "Password must be at least 6 characters"));
		}
		// If password fits requirements, encrypt it using bcyrpt
		req.body.password = bcrypt.hashSync(req.body.password, 10);
	}

	// Check username length
	if (req.body.username) {
		if (req.body.username.length < 7 || req.body.username.length > 20) {
			return next(
				errorHandler(400, "Username must be between 7 and 20 characters")
			);
		}
		// Check for whitespace in username
		if (req.body.username.includes(" ")) {
			return next(errorHandler(400, "Username cannot contain spaces"));
		}
		// Check to make sure username is all lowercase
		if (req.body.username !== req.body.username.toLowerCase()) {
			return next(
				errorHandler(400, "Username can only contain lowercase characters")
			);
		}
		// Check for special characters
		if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
			return next(
				errorHandler(400, "Username can only contain letters and numbers")
			);
		}

		// try catch block to update username
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.userId,
				{
					$set: {
						username: req.body.username,
						email: req.body.email,
						profilePicture: req.body.profilePicture,
						password: req.body.password,
					},
				},
				{ new: true }
			);
			const { password, ...rest } = updatedUser._doc;
			res.status(200).json(rest);
		} catch (error) {
			next(error);
		}
	}
};
