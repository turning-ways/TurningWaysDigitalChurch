import { IoIosArrowBack } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const SubHeader = () => {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center flex-col mt-10 items-center relative">
			<div
				className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit absolute top-0 left-0"
				onClick={() => navigate(`/admin/directory`)}>
				<IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
			</div>
			<div className="relative">
				<RxAvatar className="w-32 h-32 text-gray-300 font-light" />
				<input type="file" accept="image/*" className="hidden" />
			</div>
		</div>
	);
};

export default SubHeader;
