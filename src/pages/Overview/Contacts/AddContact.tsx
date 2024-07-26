import { IoIosClose } from "react-icons/io";
import Modal from "../../../ui/Modal/Modal";
import InformationInput from "../Membership/Edit Profile/InformationInput";
import PhoneNumber from "../../../ui/Input/PhoneNumber";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { createContact, selectContactsLoading } from "../../../slices/contactSlice";
import { AppDispatch } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useChurchIdStore } from "../../../stores/churchId";
import { DropDownInput } from "../../../ui/DropDownMenu/DropDownInput";
import { notify } from "../../../hooks/useAuthData";

interface AddContactProps {
	onClose: () => void;
}

const AddContact: React.FC<AddContactProps> = ({ onClose }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [maturity, setMaturity] = useState("undefined");
	const [email, setEmail] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [gender, setGender] = useState("");
	const churchId = useChurchIdStore((state) => state.churchId);
	const dispatch = useDispatch<AppDispatch>();
	const isPending = useSelector(selectContactsLoading);
	const user = JSON.parse(localStorage.getItem("user") as string);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!firstName || !phoneNumber || !maturity || !gender) {
			notify("Please fill in all the required fields");
			return;
		}
		if (phoneNumber.length < 10) {
			notify("Please enter a valid phone number");
			return;
		}
		dispatch(
			createContact({
				churchId,
				contact: {
					firstName,
					lastName,
					phone: phoneNumber,
					address,
					maturityLevel: maturity,
					email,
					gender,
					createdBy: user.memberId,
					// dateOfBirth,
				},
				onClose: onClose,
			})
		);
	};

	return (
		<Modal onClose={onClose} className="">
			<form
				className={`w-[450px] md:w-[605px] bg-white px-6 py-6 border rounded-2xl flex flex-col max-h-[700px] overflow-y-scroll`}
				onSubmit={handleSubmit}>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl">Add Contact</h1>
					<IoIosClose className="text-5xl cursor-pointer" onClick={onClose} />
				</div>
				<InformationInput
					text={"First Name"}
					onChange={(e) => {
						setFirstName(e.target.value);
					}}
					value={firstName}
				/>
				<InformationInput
					text={"Last Name"}
					onChange={(e) => {
						setLastName(e.target.value);
					}}
					value={lastName}
					notCompulsory=" "
				/>
				<PhoneNumber value={phoneNumber} setValue={(value) => setPhoneNumber(value)} />
				<DropDownInput
					text="Maturity"
					items={["infant", "child", "teen", "adult", "elder", "undefined"]}
					placeholder="Child, Adult or Teen"
					compulsory=" "
					onSelect={(value) => setMaturity(value)}
					value={maturity}
					onChange={(maturity) => setMaturity(maturity)}
				/>
				<InformationInput
					text={"Email"}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					value={email}
					notCompulsory=" "
				/>
				<div className=" space-y-1 mb-4">
					<p className="text-[#727272]">D.O.B</p>
					<div className="border rounded-lg p-2">
						<input
							className="outline-none text-[#434343] text-lg w-full"
							type="date"
							value={dateOfBirth}
							onChange={(e) => setDateOfBirth(e.target.value)}
						/>
					</div>
				</div>
				<DropDownInput
					text="Gender"
					items={["male", "female"]}
					placeholder="Male"
					compulsory=" "
					onSelect={(value) => setGender(value)}
					value={gender}
					onChange={(gender) => setGender(gender)}
				/>
				<InformationInput
					text={"Address"}
					onChange={(e) => {
						setAddress(e.target.value);
					}}
					value={address}
					notCompulsory=" "
				/>
				<button className="self-end border border-[#414141] px-20 py-2 rounded-lg text-[#141414]">
					{!isPending ? <p>Save</p> : <ThreeDots height="25" width="50" color="#141414" />}
				</button>
			</form>
		</Modal>
	);
};

export default AddContact;
