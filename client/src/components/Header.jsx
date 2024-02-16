import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";
import { setSearchTerm } from "../redux/search/searchSlice";
import {
	Avatar,
	Button,
	Checkbox,
	Label,
	Modal,
	Dropdown,
	Navbar,
	TextInput,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
	const [openModal, setOpenModal] = useState(false);

	const path = useLocation().pathname;
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { currentUser } = useSelector((state) => state.user);
	const { theme } = useSelector((state) => state.theme);
	const { searchTerm } = useSelector((state) => state.search);

	// useEffect hook to change URL based on params
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		if (searchTermFromUrl && searchTermFromUrl !== searchTerm) {
			setSearchTerm(searchTermFromUrl);
		}
	}, [location.search, dispatch]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(location.search);
		// Set search term globally using Redux
		dispatch(setSearchTerm(searchTerm));
		urlParams.set("searchTerm", searchTerm);
		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
		setOpenModal(false);
	};

	return (
		<>
			<Navbar className="border-b-2 relative">
				<Link
					to="/"
					className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
				>
					{/* TODO: Update name + styling */}
					{/* TODO: Create separate Logo component? */}
					<span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
						Football
					</span>
					Blog
				</Link>
				<div className="flex gap-2 md:order-2">
					<Button
						onClick={() => setOpenModal(true)}
						className="w-12 h-10"
						color="gray"
						pill
					>
						<AiOutlineSearch />
					</Button>
					<Button
						className="w-12 h-10 hidden sm:inline"
						color="gray"
						pill
						onClick={() => dispatch(toggleTheme())}
					>
						{theme === "light" ? <FaSun /> : <FaMoon />}
					</Button>
					{currentUser ? (
						<Dropdown
							arrowIcon={false}
							inline
							label={
								<Avatar
									alt="user"
									img={currentUser.profilePicture}
									rounded
								/>
							}
						>
							<Dropdown.Header>
								<span className="block text-sm">@{currentUser.username}</span>
								<span className="block text-sm font-medium truncate">
									{currentUser.email}
								</span>
							</Dropdown.Header>
							<Link to={"/dashboard?tab=profile"}>
								<Dropdown.Item>Profile</Dropdown.Item>
							</Link>
							<Dropdown.Divider />
							<Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
						</Dropdown>
					) : (
						<Link to="/sign-in">
							<Button
								gradientDuoTone="purpleToBlue"
								outline
							>
								Sign In
							</Button>
						</Link>
					)}

					<Navbar.Toggle />
				</div>
				<Navbar.Collapse>
					<Navbar.Link
						active={path === "/"}
						as={"div"}
					>
						<Link to="/">Home</Link>
					</Navbar.Link>
					<Navbar.Link
						active={path === "/about"}
						as={"div"}
					>
						<Link to="/about">About</Link>
					</Navbar.Link>
					<Navbar.Link
						active={path === "/search"}
						as={"div"}
					>
						<Link to="/search">Articles</Link>
					</Navbar.Link>
					<Navbar.Link
						active={path === "/teams"}
						as={"div"}
					>
						<Link to="/teams">Teams</Link>
					</Navbar.Link>
					<Navbar.Link
						active={path === "/forums"}
						as={"div"}
					>
						<Link to="/forums">Forums</Link>
					</Navbar.Link>
				</Navbar.Collapse>
			</Navbar>
			<Modal
				dismissible
				show={openModal}
				onClose={() => setOpenModal(false)}
				position="top-center"
				className="pt-10"
			>
				<form
					onSubmit={handleSubmit}
					className="relative"
				>
					<TextInput
						type="text"
						placeholder="Search"
						value={searchTerm}
						onChange={(e) => dispatch(setSearchTerm(e.target.value))}
						className="absolute w-full"
					/>
					<Button
						type="submit"
						color="gray"
						className="w-12 h-10 absolute right-0"
					>
						<AiOutlineSearch />
					</Button>
				</form>
			</Modal>
		</>
	);
}
