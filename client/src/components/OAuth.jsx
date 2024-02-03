import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";

import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function OAuth() {
	// Initialize auth
	const auth = getAuth(app);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleGoogleClick = async () => {
		const provider = new GoogleAuthProvider();
		// Will ask you to select Google account everytime
		provider.setCustomParameters({ prompt: "select_account" });

		try {
			const results = await signInWithPopup(auth, provider);
			const res = await fetch("/api/auth/google", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: results.user.displayName,
					email: results.user.email,
					googlePhotoUrl: results.user.photoURL,
				}),
			});

			const data = await res.json();
			if (res.ok) {
				dispatch(signInSuccess(data));
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Button
			type="button"
			gradientDuoTone="pinkToOrange"
			outline
			onClick={handleGoogleClick}
		>
			<AiFillGoogleCircle className="w-6 h-6 mr-2" />
			Continue with Google
		</Button>
	);
}
