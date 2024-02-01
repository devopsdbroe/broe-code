import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
