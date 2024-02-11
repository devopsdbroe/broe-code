import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../firebase";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
	updateStart,
	updateSuccess,
	updateFailure,
	deleteStart,
	deleteSuccess,
	deleteFailure,
	signoutSuccess,
	resetError,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
	const { currentUser, error, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// State for profile pic update
	const [imageFile, setImageFile] = useState(null);
	const [imageFileUrl, setImageFileUrl] = useState(null);
	const [imageUploadProgress, setImageUploadProgress] = useState(null);
	const [imageUploadError, setImageUploadError] = useState(null);
	const [imageUploading, setImageUploading] = useState(false);
	const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
	const [updateUserError, setUpdateUserError] = useState(null);

	// State for updating profile
	const [formData, setFormData] = useState({});

	// State for modal to confirm delete user
	const [showModal, setShowModal] = useState(false);

	const filePickerRef = useRef();

	// useEffect to update profile pic
	useEffect(() => {
		if (imageFile) {
			uploadImage();
		}

		// Cleanup function to remove error message (if there is one)
		return () => {
			dispatch(resetError());
		};
	}, [imageFile, dispatch]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			setImageFile(e.target.files[0]);
			setImageFileUrl(URL.createObjectURL(file));
		}
	};

	const uploadImage = async () => {
		setImageUploading(true);
		setImageUploadError(null);
		const storage = getStorage(app);
		const fileName = new Date().getTime() + imageFile.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setImageUploadProgress(progress.toFixed(0));
			},
			(error) => {
				setImageUploadError(
					"Could not upload image (File must be less than 2MB)"
				);
				setImageUploadProgress(null);
				setImageFile(null);
				setImageFileUrl(null);
				setImageUploading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageFileUrl(downloadURL);
					setFormData({ ...formData, profilePicture: downloadURL });
					setImageUploading(false);
				});
			}
		);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUpdateUserSuccess(null);
		setUpdateUserError(null);

		if (Object.keys(formData).length === 0) {
			setUpdateUserError("No changes made");
			return;
		}

		if (imageUploading) {
			setUpdateUserError("Please wait for image to upload");
			return;
		}

		try {
			dispatch(updateStart());
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();

			if (!res.ok) {
				dispatch(updateFailure(data.message));
				// setUpdateUserError(data.message);
			} else {
				dispatch(updateSuccess(data));
				setUpdateUserSuccess("User profile updated successfully");
			}
		} catch (error) {
			dispatch(updateFailure(error.message));
			// setUpdateUserError(error.message);
		}
	};

	const handleDeleteUser = async () => {
		setShowModal(false);
		try {
			dispatch(deleteStart());
			const res = await fetch(`/api/user/delete/${currentUser._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				dispatch(deleteFailure(data.message));
			} else {
				dispatch(deleteSuccess(data));
			}
		} catch (error) {
			dispatch(deleteFailure(error.message));
		}
	};

	const handleSignout = async () => {
		try {
			const res = await fetch("/api/user/signout", {
				method: "POST",
			});
			const data = await res.json();

			if (!res.ok) {
				console.log(data.message);
			} else {
				dispatch(signoutSuccess());
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="max-w-lg mx-auto p-3 w-full">
			<h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4"
			>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					ref={filePickerRef}
					hidden
				/>
				<div
					className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
					onClick={() => filePickerRef.current.click()}
				>
					{imageUploadProgress && (
						<CircularProgressbar
							value={imageUploadProgress || 0}
							text={`${imageUploadProgress}%`}
							strokeWidth={5}
							styles={{
								root: {
									width: "100%",
									height: "100%",
									position: "absolute",
									top: 0,
									left: 0,
								},
								path: {
									stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100})`,
								},
							}}
						/>
					)}
					<img
						src={imageFileUrl || currentUser.profilePicture}
						alt="user"
						className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
							imageUploadProgress && imageUploadProgress < 100 && "opacity-60"
						}`}
					/>
				</div>
				{imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

				<TextInput
					type="text"
					id="username"
					placeholder="Username"
					defaultValue={currentUser.username}
					onChange={handleChange}
				/>
				<TextInput
					type="email"
					id="email"
					placeholder="Email"
					defaultValue={currentUser.email}
					onChange={handleChange}
				/>
				<TextInput
					type="password"
					id="password"
					placeholder="Password"
					onChange={handleChange}
				/>
				<Button
					type="submit"
					gradientDuoTone="purpleToBlue"
					outline
					disabled={loading || imageUploading}
				>
					{loading ? "Loading..." : "Update"}
				</Button>
				{currentUser.isAdmin && (
					<Link to={"/create-post"}>
						<Button
							type="button"
							gradientDuoTone="purpleToPink"
							className="w-full"
						>
							Create a post
						</Button>
					</Link>
				)}
			</form>
			<div className="text-red-500 flex justify-between mt-5">
				<span
					onClick={() => setShowModal(true)}
					className="cursor-pointer"
				>
					Delete Account
				</span>
				<span
					onClick={handleSignout}
					className="cursor-pointer"
				>
					Sign Out
				</span>
			</div>
			{updateUserSuccess && (
				<Alert
					color="success"
					className="mt-5"
				>
					{updateUserSuccess}
				</Alert>
			)}
			{updateUserError && (
				<Alert
					color="failure"
					className="mt-5"
				>
					{updateUserError}
				</Alert>
			)}
			{error && (
				<Alert
					color="failure"
					className="mt-5"
				>
					{error}
				</Alert>
			)}
			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				popup
				size="md"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
						<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
							Are you sure you want to delete your account?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="failure"
								onClick={handleDeleteUser}
							>
								Yes, I'm sure
							</Button>
							<Button
								color="gray"
								onClick={() => setShowModal(false)}
							>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
