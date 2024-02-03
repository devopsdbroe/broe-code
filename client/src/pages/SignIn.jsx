import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		// Add data with .trim() to remove whitespace
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.email || !formData.password) {
			return setError("Please fill out all fields.");
		}

		try {
			setLoading(true);
			setError(null);
			const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();

			if (data.success === false) {
				return setError(data.message);
			}

			// If successful, reroute user to home page
			setLoading(false);
			if (res.ok) {
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen mt-20">
			<div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
				{/* Left side */}
				<div className="flex-1">
					<Link
						to="/"
						className="font-bold dark:text-white text-4xl"
					>
						{/* TODO: Update name + styling */}
						{/* TODO: Create separate Logo component? */}
						<span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
							Football
						</span>
						Blog
					</Link>
					<p className="text-sm mt-5">
						This is a demo project. You can sign in with your email and password
						or with Google.
					</p>
				</div>

				{/* Right side */}
				<div className="flex-1">
					<form
						className="flex flex-col gap-4"
						onSubmit={handleSubmit}
					>
						<div>
							<Label value="Your email" />
							<TextInput
								type="email"
								placeholder="name@company.com"
								id="email"
								onChange={handleChange}
							/>
						</div>
						<div>
							<Label value="Your password" />
							<TextInput
								type="password"
								placeholder="Password"
								id="password"
								onChange={handleChange}
							/>
						</div>
						<Button
							gradientDuoTone="purpleToPink"
							type="submit"
							disabled={loading}
						>
							{loading ? (
								<>
									<Spinner size="sm" />
									<span className="pl-3">Loading...</span>
								</>
							) : (
								"Sign In"
							)}
						</Button>
					</form>
					<div className="flex gap-2 text-sm mt-5">
						<span>Don&apos;t have an account?</span>
						<Link
							to="/sign-up"
							className="text-blue-500"
						>
							Sign Up
						</Link>
					</div>
					{error && (
						<Alert
							className="mt-5"
							color="failure"
						>
							{error}
						</Alert>
					)}
				</div>
			</div>
		</div>
	);
}
