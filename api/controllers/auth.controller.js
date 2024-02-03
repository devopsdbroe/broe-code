import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Asynchronous function because of connection to DB
export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;

	if (
		!username ||
		!email ||
		!password ||
		username === "" ||
		email === "" ||
		password === ""
	) {
		// Call errorHandler utility function for custom error
		next(errorHandler(400, "All fields are required"));
	}

	// Encrypt password using bcrypt
	const hashedPassword = bcryptjs.hashSync(password, 10);

	const newUser = new User({ username, email, password: hashedPassword });

	try {
		await newUser.save();
		res.json("Signup successful");
	} catch (error) {
		// Throw error using middleware from index.js
		next(error);
	}
};

export const signin = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password || email === "" || password === "") {
		next(errorHandler(400, "All fields are required"));
	}

	try {
		// Validate user
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(404, "Invalid credentials"));
		}

		// Validate password
		const validPassword = bcryptjs.compareSync(password, validUser.password);
		if (!validPassword) {
			return next(errorHandler(400, "Invalid credentials"));
		}

		// If user and password are valid, create token using JWT
		const token = jwt.sign(
			{
				id: validUser._id,
			},
			process.env.JWT_SECRET
		);

		// Remove password from response
		const { password: pass, ...rest } = validUser._doc;

		res
			.status(200)
			.cookie("access_token", token, { httpOnly: true })
			.json(rest);
	} catch (error) {
		next(error);
	}
};
