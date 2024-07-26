import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { LuCamera } from "react-icons/lu";
import { useEffect, useRef, useCallback, useMemo } from "react";
import axios from "../../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { useChurchIdStore } from "../../../../stores/churchId";
import { fetchMemberDetails } from "../../../../slices/memberSlice";

const SubHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { member } = useSelector((state: RootState) => state.members);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { churchId } = useChurchIdStore();
	const queryParams = useMemo(() => new URLSearchParams(location.search), []);
	const memberId = useMemo(() => queryParams.get("id") ?? "", [queryParams]);

	useEffect(() => {
		if (memberId) {
			dispatch(fetchMemberDetails({ churchId, memberId }));
		}
	}, [dispatch, churchId, memberId]);

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			if (event.target.files && event.target.files[0]) {
				const file = event.target.files[0];
				const formData = new FormData();
				formData.append("image", file);

				try {
					const response = await axios.post(
						`https://turningways-api-3hcn.onrender.com/api/v1/members/${memberId}/profile-picture`,
						formData,
						{
							headers: {
								"Content-Type": "multipart/form-data",
							},
						}
					);

					if (response.status === 200) {
						dispatch(fetchMemberDetails({ churchId, memberId }));
						console.log(response);
					} else {
						console.error("Failed to upload image:", response.statusText);
					}
				} catch (error) {
					console.error("An error occurred:", error);
				}
			}
		},
		[dispatch, churchId, memberId]
	);

	const handleIconClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	return (
		<div className="flex justify-center flex-col mt-10 items-center relative">
			<div
				className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit absolute top-0 left-0"
				onClick={() => navigate(`/admin/directory/member/personal-information?id=${memberId}`)}>
				<IoIosArrowBack className="text-2xl w-auto text-[#6C6C6D]" />
			</div>
			<div className="relative">
				{member?.profile?.photo ? (
					<img
						src={member.profile.photo}
						alt="Profile"
						className="w-32 h-32 rounded-full object-cover"
					/>
				) : (
					<div className="border border-black w-32 h-32 rounded-full mb-5 flex justify-center items-center text-5xl">
						{member?.profile?.firstName?.charAt(0).toUpperCase() +
							member?.profile?.lastName?.charAt(0).toUpperCase()}
					</div>
				)}
				<button
					onClick={handleIconClick}
					className="mt-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 absolute bottom-0 right-0">
					<LuCamera className="text-xl" />
				</button>
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					ref={fileInputRef}
					className="hidden"
				/>
			</div>
		</div>
	);
};

export default SubHeader;
