import InformationInput from "./InformationInput";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import HeaderTwo from "../../../../ui/Heading/HeaderTwo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { selectTempMember, updateTempMemberField } from "../../../../slices/memberSlice";

const EditProfileContactInfo = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const tempMember = useSelector(selectTempMember);

	const handleInputChange = (field: string, value: any) => {
		dispatch(updateTempMemberField({ field, value }));
	};

	const information = [
		{
			name: "Email",
			set: (value: string) => handleInputChange("profile.email", value),
			value: tempMember?.profile?.email,
		},
		{
			name: "Home Address",
			set: (value: string) => handleInputChange("profile.address.homeAddress", value),
			value: tempMember?.profile?.address ? tempMember?.profile?.address.homeAddress : " ",
		},
	];

	return (
		<div className="mt-5 flex flex-col">
			{information.map((item, index) => (
				<InformationInput
					key={index}
					text={item.name}
					onChange={(e) => {
						item.set(e.target.value);
					}}
					value={item.value}
					notCompulsory={" "}
					type={item.name === "Email" ? "email" : "text"}
				/>
			))}
			<div className="mb-2">
				<HeaderTwo>
					Phone Number <span className="text-[#61BD74]">*</span>
				</HeaderTwo>

				<PhoneInput
					defaultCountry="ng"
					value={tempMember?.profile?.phone?.mainPhone}
					onChange={(phone) => handleInputChange("profile.phone.mainPhone", phone)}
					inputStyle={{
						width: "100%",
						paddingLeft: "10px",
						paddingTop: "24px",
						paddingRight: "10px",
						paddingBottom: "24px",
						borderColor: "#EBEFF9",
						borderStartEndRadius: "8px",
						borderEndEndRadius: "8px",
						fontSize: "18px",
					}}
					countrySelectorStyleProps={{
						buttonStyle: {
							height: "100%",
							paddingLeft: "10px",
							paddingRight: "10px",
							borderColor: "#EBEFF9",
							borderEndStartRadius: "8px",
							borderStartStartRadius: "8px",
						},
					}}
				/>
			</div>
			<div className="flex justify-between">
				<button
					className="flex mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
					onClick={() => navigate("/admin/directory/add-member/personal-information")}>
					<p className="text-lg">Previous</p>
				</button>
				<button
					className="flex mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
					onClick={() => navigate("/admin/directory/add-member/church-information")}>
					<p className="text-lg">Next</p>
				</button>
			</div>
		</div>
	);
};

export default EditProfileContactInfo;
