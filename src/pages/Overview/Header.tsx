import React, { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline, IoMdNotificationsOutline } from "react-icons/io";
import { useUserAuth } from "../../stores/user";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal/Modal";
import { success } from "../../hooks/useAuthData";
import Search from "../../ui/Search";
import axiosInstance from "../../axios";

interface HeaderProps {
	text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
	// const { user } = useUserAuth();
	const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user") as string);
	const first_name = user?.firstName;
	const last_name = user?.lastName;
	const navigate = useNavigate();

	const [showProfile, setShowProfile] = useState<boolean>(false);

	const [active, setActive] = useState("");

	const { setUser } = useUserAuth();

	const logoutUser = async () => {
		try {
			// Make the GET request to log out the user
			const response = await axiosInstance.get(
				"https://turningways-api-3hcn.onrender.com/api/v1/auth/logout",
				{
					withCredentials: true,
				}
			);

			// Check if the response status code indicates success
			if (response.status === 200) {
				// Clear user data and local storage
				setUser(null);
				localStorage.clear();

				// Navigate to the home page
				navigate("/");

				// Notify the user of successful logout
				success("Logged Out");
			} else {
				// Handle non-200 response status codes
				console.error("Error logging out user:", response.statusText);
				// Optionally, you can show a message to the user here
			}
		} catch (error) {
			// Handle errors in the request
			console.error("Error logging out user:", error);
			// Optionally, you can show a message to the user here
		}
	};

	const dropdownRef = useRef<HTMLDivElement>(null);

	// Function to handle clicks outside the dropdown
	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setShowProfile(false);
		}
	};

	// Effect to set up event listener when component mounts
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		// Clean up event listener when component unmounts
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="space-y-5 font-azo flex flex-col relative" ref={dropdownRef}>
			<div className="flex items-center gap-x-2">
				<div className="bg-yellow-400 h-10 w-10 justify-center flex items-center rounded-full">
					{user?.church.charAt(0)?.toUpperCase()}
				</div>
				<h1 className="tracking-widest">{user?.church?.toUpperCase()}</h1>
			</div>
			<div className="flex justify-between items-center">
				<h2 className="font-azoBold text-[#0F1D48] text-3xl">{text}</h2>
				<div className="flex space-x-3 items-center">
					<Search size="hidden md:flex" />
					<IoIosAddCircleOutline
						className="text-[45px] cursor-pointer hidden sm:block"
						onClick={() => navigate("/admin/directory/add-member/personal-information")}
					/>
					<IoMdNotificationsOutline style={{ fontSize: "28px" }} />
					<div className="flex space-x-2 items-center">
						<div
							className="flex space-x-2 items-center w-fit "
							onClick={() => setShowProfile(!showProfile)}>
							{user?.photo ? (
								<img src={user.photo} className="w-full h-[28px] rounded-full" />
							) : (
								<div className="border-black border w-10 h-10 bg-primary font-semibold text-white rounded-full flex justify-center items-center cursor-pointer z-50">
									{first_name && first_name?.charAt(0) + last_name?.charAt(0)}
								</div>
							)}
						</div>
						<p className="hidden sm:block text-lg">{first_name}</p>
					</div>
				</div>
			</div>
			<Search size="md:hidden flex" />
			<div
				className={`self-end bg-white  p-6 space-y-4 border border-black absolute top-[84px] z-50 rounded-2xl text-[#434343] ${
					showProfile ? "block" : "hidden"
				}`}>
				<div className="flex space-x-2 items-center">
					{user?.photo ? (
						<img src={user.photo} className="w-10 h-10 rounded-full" />
					) : (
						<div className="border-black bg-primary font-semibold text-white border w-10 h-10 rounded-full flex justify-center items-center cursor-pointer z-50">
							{first_name &&
								first_name?.charAt(0).toUpperCase() + last_name?.charAt(0).toUpperCase()}
						</div>
					)}
					<div>
						<p className="text-base text-[#555555]">{first_name && first_name + " " + last_name}</p>
						<p className="text-sm font-medium text-primary">{user?.role}</p>
					</div>
				</div>
				<h1 className="text-[#7F7F7F] hover:text-[#555555] cursor-pointer">Profile</h1>
				<h1 className="text-[#7F7F7F] hover:text-[#555555] cursor-pointer">Settings</h1>
				<h1
					className=" text-[#7F7F7F] hover:text-[#555555] cursor-pointer"
					onClick={() => setActive("logout")}>
					Logout
				</h1>
				{active === "logout" && (
					<Modal onClose={() => setActive("")} className="">
						<div className="bg-white px-[26px] py-[37px] rounded-2xl text-lg flex flex-col gap-6">
							<p>Are you sure you want to log out</p>

							<div className="flex self-center space-x-4">
								<button
									className=" text-[#ffffff] bg-[#e74a4a]  py-2 px-4 rounded-[14px] self-center"
									onClick={logoutUser}>
									Logout
								</button>
								<button
									className=" text-[#7B7B7B] bg-[#F4F4F4] py-2 px-4 rounded-[14px] self-center"
									onClick={() => setActive("")}>
									Cancel
								</button>
							</div>
						</div>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default Header;
