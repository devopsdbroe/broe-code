import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
	// State to store user comment info
	const [user, setUser] = useState({});

	// State for editing comments
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(comment.content);

	const { currentUser } = useSelector((state) => state.user);

	// Fetch user information for each comment
	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch(`/api/user/${comment.userId}`);
				const data = await res.json();

				if (res.ok) {
					setUser(data);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getUser();
	}, [comment]);

	const handleEdit = () => {
		setIsEditing(true);
		setEditedContent(comment.content);
	};

	// To update comment in DB
	const handleSave = async () => {
		try {
			const res = await fetch(`/api/comment/editComment/${comment._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: editedContent,
				}),
			});

			// If update operation completes successfully, close edit window and call onEdit
			if (res.ok) {
				setIsEditing(false);
				onEdit(comment, editedContent);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="flex p-4 border-b dark:border-gray-600 text-sm">
			<div className="flex-shrink-0 mr-3">
				<img
					src={user.profilePicture}
					alt={user.username}
					className="w-10 h-10 rounded-full bg-gray-200"
				/>
			</div>
			<div className="flex-1">
				<div className="flex items-center mb-1">
					<span className="font-bold mr-1 text-xs truncate">
						{user ? `@${user.username}` : "Deleted user"}
					</span>
					<span className="text-gray-500 text-xs">
						{moment(comment.createdAt).fromNow()}
					</span>
				</div>
				{isEditing ? (
					<>
						<Textarea
							className="mb-2"
							maxLength="200"
							value={editedContent}
							onChange={(e) => setEditedContent(e.target.value)}
						/>
						<div className="flex justify-end gap-2 text-sm">
							<Button
								onClick={handleSave}
								type="button"
								size="sm"
								gradientDuoTone="purpleToBlue"
							>
								Save
							</Button>
							<Button
								onClick={() => setIsEditing(false)}
								type="button"
								size="sm"
								gradientDuoTone="purpleToBlue"
								outline
							>
								Cancel
							</Button>
						</div>
					</>
				) : (
					<>
						<p className="text-gray-500 mb-2">{comment.content}</p>
						<div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
							<button
								onClick={() => onLike(comment._id)}
								type="button"
								className={`text-gray-400 hover:text-blue-500 ${
									currentUser &&
									comment.likes.includes(currentUser._id) &&
									"!text-blue-500"
								}`}
							>
								<FaThumbsUp className="text-sm" />
							</button>
							<p className="text-gray-400">
								{comment.numberOfLikes > 0 &&
									comment.numberOfLikes +
										" " +
										(comment.numberOfLikes === 1 ? "like" : "likes")}
							</p>
							{currentUser &&
								(currentUser._id === comment.userId || currentUser.isAdmin) && (
									<>
										<button
											onClick={handleEdit}
											type="button"
											className="text-gray-400 hover:text-blue-500"
										>
											Edit
										</button>
										<button
											onClick={() => onDelete(comment._id)}
											type="button"
											className="text-gray-400 hover:text-red-500"
										>
											Delete
										</button>
									</>
								)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
