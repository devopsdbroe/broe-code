import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashComments() {
	const { currentUser } = useSelector((state) => state.user);

	const [comments, setComments] = useState([]);
	const [showMore, setShowMore] = useState(true);

	// State for deleting posts
	const [commentIdToDelete, setCommentIdToDelete] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await fetch(`/api/comment/getComments`);
				const data = await res.json();
				if (res.ok) {
					setComments(data.comments);
					if (data.comments.length < 9) {
						setShowMore(false);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};

		if (currentUser.isAdmin) {
			fetchComments();
		}
	}, [currentUser._id]);

	const handleShowMore = async () => {
		const startIndex = comments.length;
		try {
			const res = await fetch(
				`/api/comment/getComments?startIndex=${startIndex}`
			);
			const data = await res.json();
			if (res.ok) {
				setComments((prev) => [...prev, ...data.comments]);
				if (data.comments.length < 9) {
					setShowMore(false);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleDeleteComment = async () => {
		try {
			const res = await fetch(
				`/api/comment/deleteComment/${commentIdToDelete}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();

			if (res.ok) {
				// Filter out comment that is being deleted
				setComments((prev) =>
					prev.filter((comment) => comment._id !== commentIdToDelete)
				);
				setShowModal(false);
			} else {
				console.log(data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="tabel-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
			{currentUser.isAdmin && comments.length > 0 ? (
				<>
					<Table
						hoverable
						className="shadow-md"
					>
						<Table.Head>
							<Table.HeadCell>Date updated</Table.HeadCell>
							<Table.HeadCell>Comment content</Table.HeadCell>
							<Table.HeadCell>Number of likes</Table.HeadCell>
							<Table.HeadCell>Post Title</Table.HeadCell>
							<Table.HeadCell>User</Table.HeadCell>
							<Table.HeadCell>Delete</Table.HeadCell>
						</Table.Head>
						{comments.map((comment) => (
							<Table.Body
								key={comment._id}
								className="divide-y"
							>
								<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
									<Table.Cell>
										{new Date(comment.updatedAt).toLocaleDateString()}
									</Table.Cell>
									<Table.Cell>{comment.content}</Table.Cell>
									<Table.Cell>{comment.numberOfLikes}</Table.Cell>
									<Table.Cell>{comment.postId.title}</Table.Cell>
									<Table.Cell>{comment.userId.username}</Table.Cell>
									<Table.Cell>
										<span
											onClick={() => {
												setShowModal(true);
												setCommentIdToDelete(comment._id);
											}}
											className="font-medium text-red-500 hover:underline cursor-pointer"
										>
											Delete
										</span>
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						))}
					</Table>
					{showMore && (
						<button
							onClick={handleShowMore}
							className="w-full text-teal-500 self-center text-sm py-7"
						>
							Show more
						</button>
					)}
				</>
			) : (
				<p>There are no comments yet</p>
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
								onClick={handleDeleteComment}
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
