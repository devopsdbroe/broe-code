import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// Asynchronous function because of connection to DB
export const signup = async (req, res) => {
	const { username, email, password } = req.body;

	if (
		!username ||
		!email ||
		!password ||
		username === "" ||
		email === "" ||
		password === ""
	) {
		return res.status(400).json({ message: "All fields are required" });
	}

	// Encrypt password using bcrypt
	const hashedPassword = bcryptjs.hashSync(password, 10);

	const newUser = new User({ username, email, password: hashedPassword });

	try {
		await newUser.save();
		res.json("Signup successful");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
