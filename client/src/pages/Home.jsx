import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoIosPlay, IoIosPause } from "react-icons/io";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [featuredPosts, setFeaturedPosts] = useState([]);

	// State for play/pause buttons
	const [isPlaying, setIsPlaying] = useState(true);

	// Swiper config for progress spinner
	const progressCircle = useRef(null);
	const progressContent = useRef(null);
	const onAutoplayTimeLeft = (s, time, progress) => {
		progressCircle.current.style.setProperty("--progress", 1 - progress);
		progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
	};

	// Swiper play/pause buttons
	const heroSwiper = useRef(null);
	const playHero = (e) => {
		e.preventDefault();
		heroSwiper.current.swiper.autoplay.start();
		setIsPlaying(true);
	};
	const pauseHero = (e) => {
		e.preventDefault();
		heroSwiper.current.swiper.autoplay.stop();
		setIsPlaying(false);
	};

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

	useEffect(() => {
		const fetchFeaturedPosts = async () => {
			const res = await fetch("/api/post/getFeaturedPosts");
			const data = await res.json();
			if (res.ok) {
				setFeaturedPosts(data);
			}
		};
		fetchFeaturedPosts();
	}, []);

	return (
		<div>
			<div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold lg:text-6xl">
					Welcome to Football Blog
				</h1>
				<p className="text-gray-500 text-xs sm:text-sm">
					Here you'll find a variety of articles covering the NFL, its teams,
					its players, and all of the stories surrounding them.
				</p>
				<Link
					to="/search"
					className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
				>
					View all posts
				</Link>
			</div>
			<div className="w-full h-[100vh]">
				<Swiper
					ref={heroSwiper}
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 9500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					rewind={true}
					modules={[Autoplay, Pagination, Navigation]}
					onAutoplayTimeLeft={onAutoplayTimeLeft}
				>
					{featuredPosts.map((feat) => (
						<SwiperSlide
							key={feat._id}
							className="relative flex w-full h-full"
						>
							<div className="absolute inset-0 w-full h-full bg-gradient-to-t sm:bg-gradient-to-r from-black to-transparent" />
							<div className="absolute inset-0 sm:left-40 sm:bottom-20 flex flex-col justify-center items-center sm:justify-start sm:flex-row p-10">
								<div className="text-white mt-auto sm:mt-0">
									<h2 className="text-xl sm:text-3xl font-bold">
										{feat.title}
									</h2>
									<p className="text-md sm:text-xl font-semibold">
										{feat.description}
									</p>
									<Link
										to={`/post/${feat.slug}`}
										className="text-teal-500 hover:underline"
									>
										Read More
									</Link>
								</div>
							</div>
							<img
								src={feat.image}
								alt="featured cover"
								className="w-full h-full object-cover"
							/>
						</SwiperSlide>
					))}

					<div
						className="autoplay-progress"
						slot="container-end"
					>
						<svg
							viewBox="0 0 48 48"
							ref={progressCircle}
						>
							<circle
								cx="24"
								cy="24"
								r="20"
							></circle>
						</svg>
						<span ref={progressContent}></span>
					</div>
					{/* TODO: Integrate play/pause button */}
					{/* {isPlaying ? (
						<button
							type="button"
							onClick={pauseHero}
							className="absolute inset-0 flex justify-center items-center text-white"
						>
							<IoIosPause className="h-6 w-6 text-white" />
						</button>
					) : (
						<button
							type="button"
							onClick={playHero}
							className="absolute inset-0 flex justify-center items-center text-white"
						>
							<IoIosPlay className="h-6 w-6 text-white" />
						</button>
					)} */}
				</Swiper>
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
