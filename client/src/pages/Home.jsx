import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch("/api/post/getPosts?limit=3");
			const data = await res.json();
			if (res.ok) {
				setPosts(data.posts);
			}
		};
		fetchPosts();
	}, []);

	return (
		<div>
			<div className="flex flex-col gap-6 p-28 px-10 max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold lg:text-6xl">Welcome to Broe Code</h1>
				<p className="text-gray-500 text-xs sm:text-sm">
					Here I&apos;ll be sharing my journey from novice to full-stack expert
				</p>
				<Link
					to="/search"
					className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
				>
					View all posts
				</Link>
			</div>
			<div className="p-3 bg-amber-100 dark:bg-slate-700">
				<CallToAction />
			</div>
			<div className="p-3 flex flex-col max-w-[1400px] mx-auto">
				{posts && posts.length > 0 && (
					<div className="flex flex-col justify-center items-center mb-5">
						<h2 className="text-xl mt-5 font-semibold">Recent Articles</h2>
						<div className="flex flex-wrap gap-5 mt-5 justify-center">
							{posts.map((post) => (
								<PostCard
									key={post._id}
									post={post}
								/>
							))}
						</div>
						<Link
							to="/search"
							className="text-lg text-teal-500 hover:underline text-center mt-5"
						>
							View all posts
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
