import AuthContainer from "../../../ui/Container/AuthContainer";
import Header from "../../../ui/Heading/Header";
import HeaderTwo from "../../../ui/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";

import { useEffect, useState } from "react";
import NextButton from "../../../ui/Button/NextButton";
import DropDownMenu from "../../../ui/DropDownMenu/DropDownMenu";
import { roles, hearAboutUs } from "../../../constants/constants";
import { useMemberStore } from "../../../stores/member";
import { useNavigate } from "react-router-dom";

// import useAddMember from "../../../hooks/AddMember/useAddMember";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { notify } from "../../../hooks/useAuthData";
import axios from "axios";
import { useAuthStore } from "../../../stores/churchId";

const PersonalInfo = () => {
	const [phone, setPhone] = useState("");
	const [showRoles, setShowRoles] = useState<boolean>(false);
	const [showHearAbout, setShowHearAbout] = useState<boolean>(false);
	const [showGender, setShowGender] = useState<boolean>(false);
	// const { mutate, isPending } = useAddMember();
	const [hear, setHear] = useState("");
	const [roleValue, setRoleValue] = useState("");
	const [genderValue, setGenderValue] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [dateOfBirthValue, setDateOfBirthValue] = useState("");

	const handleSelectHearAbout = (selectedItem: string) => {
		setHear(selectedItem);
		setShowHearAbout(false);
	};

	const handleSelectRoles = (selectedItem: string) => {
		setRoleValue(selectedItem);
		setShowRoles(false);
	};

	const handleSelectGender = (selectedItem: string) => {
		setGenderValue(selectedItem);
		setShowGender(false);
	};

	useEffect(() => {
		const refreshAuthToken = async () => {
			try {
				localStorage.clear();
				const response = await axios.post(
					"/api/v1/auth/refresh",
					{},
					{
						withCredentials: true,
					}
				);

				if (response.status === 200) {
					useAuthStore.getState().setToken(response.data.accessToken);
					return;
				}
			} catch (error) {
				console.error("Error refreshing auth token:", error);
				// Handle error appropriately, e.g., redirect to login page
			}
		};

		refreshAuthToken();
	}, []); // Add dependencies if needed

	// const { mutate, isPending } = useAddMember();

	const {
		setPhoneNumber,
		setHowDidYouHear,
		setRole,
		setGender,
		setEmail,
		setDateOfBirth,
		role,
		howDidYouHear,
		gender,
		phoneNumber,
		dateOfBirth,
		email,
	} = useMemberStore();

	useEffect(() => {
		setRoleValue(role);
		setPhone(phoneNumber.MainPhone);
		setGenderValue(gender);
		setDateOfBirthValue(dateOfBirth);
		setHear(howDidYouHear);
		setEmailValue(email);
	}, []);

	//navigation
	const navigate = useNavigate();

	// const isNumeric = (value: string) => {
	//   return /^0\d{10}$/.test(value);
	// };

	return (
		<>
			<AuthContainer center={" h-screen pt-16 md:pt-0"}>
				<form
					className=""
					onSubmit={(e) => {
						e.preventDefault();
						setPhoneNumber({ MainPhone: phone });
						setHowDidYouHear(hear);
						setRole(roleValue);
						setGender(genderValue);
						setEmail(emailValue);
						setDateOfBirth(dateOfBirthValue);

						if (
							phone !== "" &&
							// hear !== "" &&
							// roleValue !== "" &&
							// emailValue !== "" &&
							genderValue !== ""
							// dateOfBirthValue !== ""
						) {
							// if (isNumeric(phone)) {
							navigate("/register/organizationinfo");
							// } else {
							//   notify("Please enter a valid phone number");
							//   console.log(phone);
							// }
						} else {
							notify("Please fill in all details");
						}
					}}>
					<div className="mb-5 max-w-[550px] mx-auto">
						<p>
							<span className="text-[#446DE3] text-2xl">1</span> of 3
						</p>
						<Header>Church Account Setup</Header>
						<p className="text-[#949995]">Kindly fill in the admin details below</p>
					</div>
					<div className="space-y-8 mb-10">
						<div className="mb-2">
							<HeaderTwo>
								Phone Number <span className="text-secondary">*</span>
							</HeaderTwo>

							<PhoneInput
								defaultCountry="ng"
								value={phone}
								onChange={(phone) => setPhone(phone)}
								inputStyle={{
									width: "100%",
									paddingLeft: "10px",
									paddingTop: "24px",
									paddingRight: "10px",
									paddingBottom: "24px",
									backgroundColor: "#F7FAFC",
									borderColor: "#EBEFF9",
									borderStartEndRadius: "12px",
									borderEndEndRadius: "12px",
									fontSize: "18px",
								}}
								countrySelectorStyleProps={{
									buttonStyle: {
										height: "100%",
										paddingLeft: "10px",
										paddingRight: "10px",
										backgroundColor: "#F7FAFC",
										borderColor: "#EBEFF9",
										borderEndStartRadius: "12px",
										borderStartStartRadius: "12px",
									},
								}}
							/>
						</div>

						<div className="relative">
							<HeaderTwo>
								Gender <span className="text-secondary">*</span>
							</HeaderTwo>
							<div
								className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center"
								onClick={() => setShowGender(!showGender)}
								// ref={dropdownRef}
							>
								<input
									className="outline-none w-full h-auto bg-inherit"
									placeholder="male"
									value={genderValue}
									readOnly={true}
									onChange={(e) => setGenderValue(e.target.value)}
								/>
								<div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
								<TiArrowSortedDown
									className="cursor-pointer text-3xl"
									onClick={() => setShowGender(!showGender)}
								/>
							</div>
							{showGender && (
								<DropDownMenu
									onSelect={handleSelectGender}
									dropdownItems={["Male", "Female"]}
									onClose={() => {
										setShowGender(false);
										setShowHearAbout(false);
										setShowRoles(false);
									}}
								/>
							)}
						</div>
						<div className="mb-2">
							<HeaderTwo>Email Address</HeaderTwo>
							<input
								type="text"
								className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
								placeholder="example@gmail.com"
								value={emailValue}
								onChange={(e) => setEmailValue(e.target.value)}
							/>
						</div>
						<div className=" space-y-1 mb-4">
							<p className="text-[#727272]">D.O.B</p>
							<div className="mb-2">
								<input
									className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none text-gray-500"
									type="date"
									value={dateOfBirthValue}
									onChange={(e) => setDateOfBirthValue(e.target.value)}
								/>
							</div>
						</div>
						<div className="relative">
							<HeaderTwo>What is your role in church?</HeaderTwo>
							<div
								className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center"
								onClick={() => setShowRoles(!showRoles)}>
								<input
									className="outline-none w-full h-auto bg-inherit"
									placeholder="Admin"
									value={roleValue}
									readOnly={true}
									onChange={(e) => setRoleValue(e.target.value)}
								/>
								<div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
								<TiArrowSortedDown
									className="cursor-pointer text-3xl"
									onClick={() => setShowRoles(!showRoles)}
								/>
							</div>
							{showRoles && (
								<DropDownMenu
									onSelect={handleSelectRoles}
									dropdownItems={roles}
									onClose={() => {
										setShowGender(false);
										setShowHearAbout(false);
										setShowRoles(false);
									}}
								/>
							)}
						</div>
						<div className="relative">
							<HeaderTwo>How did you hear about us?</HeaderTwo>
							<div
								className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center"
								onClick={() => setShowHearAbout(!showHearAbout)}>
								<input
									className="outline-none w-full h-auto bg-inherit"
									placeholder="Social Media"
									value={hear}
									readOnly={true}
									onChange={(e) => setHear(e.target.value)}
								/>
								<div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
								<TiArrowSortedDown
									className="cursor-pointer text-3xl"
									onClick={() => setShowHearAbout(!showHearAbout)}
								/>
							</div>
							{showHearAbout && (
								<DropDownMenu
									onSelect={handleSelectHearAbout}
									dropdownItems={hearAboutUs}
									onClose={() => {
										setShowGender(false);
										setShowHearAbout(false);
										setShowRoles(false);
									}}
								/>
							)}
						</div>
					</div>
					<NextButton />
				</form>
			</AuthContainer>
		</>
	);
};

export default PersonalInfo;
