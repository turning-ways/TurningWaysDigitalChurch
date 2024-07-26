import { useEffect, useState } from "react";
import Modal from "../../../ui/Modal/Modal";
import InformationInput from "../Membership/Edit Profile/InformationInput";
import PhoneNumber from "../../../ui/Input/PhoneNumber";
import { IoIosClose } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";
import { DropDownInput } from "../../../ui/DropDownMenu/DropDownInput";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import {
	updateContact,
	selectSelectedContact,
	selectContactsLoading,
} from "../../../slices/contactSlice";
import { useChurchIdStore } from "../../../stores/churchId";
import { notify } from "../../../hooks/useAuthData";
interface UpdateContactProps {
	onClose: () => void;
	id?: string;
}

const UpdateContact: React.FC<UpdateContactProps> = ({ onClose, id }) => {
	const contact = useSelector(selectSelectedContact);
	const isPending = useSelector(selectContactsLoading);
	const dispatch = useDispatch<AppDispatch>();

	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [gender, setGender] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [maturity, setMaturity] = useState<string>("");
	const [membership, setMembership] = useState<string>("");
	const [dateOfBirth, setDateOfBirth] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const { contact_id } = useParams();
	const safeContactId = contact_id ?? "";
	const churchId = useChurchIdStore((state) => state.churchId);
	interface Authuser {
		memberId: string;
		// Add other properties as needed
	}

	const user: Authuser = JSON.parse(localStorage.getItem("user") as string);

	const handleEdit = () => {
		if (!firstName || !gender || !phoneNumber) {
			notify("Please fill in the required fields");
			return;
		}

		if (phoneNumber.length < 10) {
			notify("Phone number must be at least 10 digits");
			return;
		}

		dispatch(
			updateContact({
				contactId: safeContactId,
				churchId: churchId,
				contact: {
					firstName: firstName?.toLowerCase(),
					lastName: lastName?.toLowerCase(),
					gender: gender?.toLowerCase(),
					address: address?.toLowerCase(),
					email: email?.toLowerCase(),
					maturityLevel: maturity?.toLowerCase(),
					memberStatus: membership?.toLowerCase(),
					phone: phoneNumber,
					dateOfBirth: dateOfBirth,
					modifiedBy: user.memberId,
				},
			})
		);
		// delay the closing of the modal to allow the user see the loading spinner
		setTimeout(() => {
			onClose();
		}, 2000);
	};

	useEffect(() => {
		if (contact) {
			setFirstName(contact.firstName);
			setLastName(contact?.lastName || "");
			setAddress(contact.address);
			setGender(contact.gender);
			setMaturity(contact.maturityLevel);
			setPhoneNumber(contact.phone);
			setEmail(contact.email);
			setMembership(contact.memberStatus);
		}
	}, [contact]);

	return (
		<Modal onClose={onClose} className="!px-1 !py-1">
			<form
				className="w-[450px] z-[999] md:w-[605px] bg-white px-6 py-6 border rounded-2xl flex flex-col max-h-[600px] overflow-y-scroll my-3"
				onSubmit={(e) => {
					e.preventDefault();
					handleEdit();
				}}>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl">Edit Contact</h1>
					{id}
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
					notCompulsory={" "}
				/>
				<DropDownInput
					text="gender"
					items={["male", "female"]}
					placeholder="male or female"
					compulsory=" "
					onSelect={(value) => setGender(value)}
					value={gender}
					onChange={(gender) => setGender(gender)}
				/>
				<PhoneNumber value={phoneNumber} setValue={(value) => setPhoneNumber(value)} />
				<DropDownInput
					text="Maturity"
					items={["infant", "child", "teen", "adult", "elder"]}
					placeholder="Child, Teen, Adult, Elder"
					compulsory=" "
					onSelect={(value) => setMaturity(value)}
					value={maturity}
					onChange={(maturity) => setMaturity(maturity)}
				/>
				<DropDownInput
					text="Membership:"
					items={["potential", "confirmed", "inprogress"]}
					placeholder="potential, inprogress, cancelled"
					onSelect={(value) => setMembership(value)}
					value={membership}
					onChange={(value) => setMembership(value)}
				/>
				<InformationInput
					text={"Email"}
					type="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					value={email}
					notCompulsory={" "}
				/>
				<InformationInput
					text={"Address"}
					onChange={(e) => {
						setAddress(e.target.value);
					}}
					value={address}
					notCompulsory={" "}
				/>
				<div className=" space-y-1 mb-4">
					<p className="text-[#727272]">
						Date Of Birth <span className="text-[#61BD74]"></span>
					</p>
					<div className="border rounded-lg p-2">
						<input
							className="outline-none text-[#434343] text-lg w-full"
							type="date"
							value={dateOfBirth}
							onChange={(e) => setDateOfBirth(e.target.value)}
						/>
					</div>
				</div>
				<button className="self-end border border-[#414141] px-20 py-2 rounded-lg text-[#141414] sticky bottom-0 bg-white">
					{!isPending ? <p>Save</p> : <ThreeDots height="25" width="50" color="#141414" />}
				</button>
			</form>
		</Modal>
	);
};

export default UpdateContact;
