import React, { useState } from "react";
import { app } from "../firebase";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
	const [file, setFile] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(null);
	const [uploadError, setUploadError] = useState(null);

	const [formData, setFormData] = useState({});

	const handleUploadImage = async () => {
		try {
			if (!file) {
				setUploadError("Please select an image");
				return;
			}
			setUploadError(null);
			const storage = getStorage(app);
			// Give image file a unique name
			const fileName = new Date().getTime() + "-" + file.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadProgress(progress.toFixed(0));
				},
				(error) => {
					setUploadError("Image upload failed");
					setUploadProgress(null);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setUploadProgress(null);
						setUploadError(null);
						setFormData({ ...formData, image: downloadURL });
					});
				}
			);
		} catch (error) {
			setUploadError("Image upload failed");
			setUploadProgress(null);
			console.log(error);
		}
	};

	return (
		<div className="p-3 max-w-3xl mx-auto min-h-screen">
			<h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
			<form className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 sm:flex-row justify-between">
					<TextInput
						type="text"
						placeholder="Title"
						required
						id="title"
						className="flex-1"
					/>
					{/* TODO: Add all teams to selector */}
					<Select>
						<option value="uncategorized">Select a category</option>
						<option value="team1">Team 1</option>
						<option value="team2">Team 2</option>
						<option value="team3">Team 3</option>
					</Select>
				</div>
				<div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
					<FileInput
						type="file"
						accept="image/*"
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<Button
						type="button"
						gradientDuoTone="purpleToBlue"
						size="sm"
						outline
						onClick={handleUploadImage}
						disabled={uploadProgress}
					>
						{uploadProgress ? (
							<div className="w-16 h-16">
								<CircularProgressbar
									value={uploadProgress}
									text={`${uploadProgress || 0}%`}
								/>
							</div>
						) : (
							"Upload image"
						)}
					</Button>
				</div>
				{uploadError && <Alert color="failure">{uploadError}</Alert>}
				{formData.image && (
					<img
						src={formData.image}
						alt="upload"
						className="w-full h-72 object-cover"
					/>
				)}
				<ReactQuill
					theme="snow"
					placeholder="Write something..."
					className="h-72 mb-12"
					required
				/>
				<Button
					type="submit"
					gradientDuoTone="purpleToPink"
				>
					Publish
				</Button>
			</form>
		</div>
	);
}
