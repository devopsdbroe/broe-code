import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);

	// Comment state to be sent to DB on submit
	const [newComment, setNewComment] = useState("");
	const [commentError, setCommentError] = useState(null);

	// State for all comments on a post
	const [comments, setComments] = useState([]);

	// State for deleting comments
	const [showModal, setShowModal] = useState(false);
	const [commentToDelete, setCommentToDelete] = useState(null);

	useEffect(() => {
		const getComments = async () => {
			try {
				const res = await fetch(`/api/comment/getPostComments/${postId}`);
				const data = await res.json();

				if (res.ok) {
					setComments(data);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getComments();
	}, [postId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Protection from if comment is longer than 200 characters
		if (newComment.length > 200) {
			return;
		}

		try {
			// Send comment state, postId from props, and currentUser ID to DB
			const res = await fetch("/api/comment/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: newComment,
					postId,
					userId: currentUser._id,
				}),
			});
			const data = await res.json();

			if (res.ok) {
				// Clear comment state on successful submit
				setNewComment("");
				setCommentError(null);
				setComments([data, ...comments]);
			}
		} catch (error) {
			setCommentError(error.message);
		}
	};

	const handleLike = async (commentId) => {
		try {
			if (!currentUser) {
				navigate("/sign-in");
				return;
			}

			const res = await fetch(`/api/comment/likeComment/${commentId}`, {
				method: "PUT",
			});
			const data = await res.json();

			if (res.ok) {
				setComments(
					comments.map((comment) =>
						comment._id === commentId
							? {
									...comment,
									likes: data.likes,
									numberOfLikes: data.numberOfLikes,
							  }
							: comment
					)
				);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	// Function is at this level because comments state is changing
	const handleEdit = async (comment, editedContent) => {
		setComments(
			comments.map((c) =>
				// Compare ID of comment passed to function vs each existing comment until match is found
				// For match, only change content to editied content passed to function
				// If no match, keep comment the same
				c._id === comment._id ? { ...c, content: editedContent } : c
			)
		);
	};

	const handleDelete = async (commentId) => {
		setShowModal(false);
		try {
			if (!currentUser) {
				navigate("/sign-in");
				return;
			}
			const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (res.ok) {
				setComments(comments.filter((comment) => comment._id !== commentId));
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="max-w-2xl mx-auto w-full p-3">
			{currentUser ? (
				<div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
					Signed in as:
					<img
						src={currentUser.profilePicture}
						alt="profile"
						className="h-5 w-5 object-cover rounded-full"
					/>
					<Link
						to={"/dashboard?tab=profile"}
						className="text-sm text-cyan-600 hover:underline"
					>
						@{currentUser.username}
					</Link>
				</div>
			) : (
				<div className="text-sm text-teal-500 my-5 flex gap-1">
					You must be logged in to comment.
					<Link
						to={"/sign-in"}
						className="text-blue-500 hover:underline"
					>
						Sign In
					</Link>
				</div>
			)}
			{currentUser && (
				<form
					onSubmit={handleSubmit}
					className="border border-teal-500 rounded-md p-3"
				>
					<Textarea
						placeholder="Add a comment"
						rows="3"
						maxLength="200"
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					/>
					<div className="flex justify-between items-center mt-5">
						<p className="text-gray-500 text-xs">
							{200 - newComment.length} characters remaining
						</p>
						<Button
							outline
							gradientDuoTone="purpleToBlue"
							type="submit"
						>
							Submit
						</Button>
					</div>
					{commentError && (
						<Alert
							color="failure"
							className="mt-5"
						>
							{commentError}
						</Alert>
					)}
				</form>
			)}
			{comments.length === 0 ? (
				<p className="text-sm my-5">
					Start the discussion! Be the first to comment on this post.
				</p>
			) : (
				// Show the number of comments
				<>
					<div className="text-sm my-5 flex items-center gap-1">
						<p>Comments</p>
						<div className="border border-gray-400 py-1 px-2 rounded-sm">
							<p>{comments.length}</p>
						</div>
					</div>
					{comments.map((comment) => (
						<Comment
							key={comment._id}
							comment={comment}
							onLike={handleLike}
							onEdit={handleEdit}
							onDelete={(commentId) => {
								setShowModal(true);
								setCommentToDelete(commentId);
							}}
						/>
					))}
				</>
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
							Are you sure you want to delete this comment?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="failure"
								onClick={() => handleDelete(commentToDelete)}
							>
								Yes, I&apos;m sure
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
