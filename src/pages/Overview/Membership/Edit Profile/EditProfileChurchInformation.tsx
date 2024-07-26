import React, { useMemo, useCallback, useEffect } from "react";
import { DropDownInput } from "../../../../ui/DropDownMenu/DropDownInput";
import { notify } from "../../../../hooks/useAuthData";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
	selectTempMember,
	updateTempMemberField,
	addMember,
	selectMemberStatus,
} from "../../../../slices/memberSlice";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useChurchIdStore } from "../../../../stores/churchId";

const EditProfileChurchInfo: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const tempMember = useSelector(selectTempMember);
	const status = useSelector(selectMemberStatus);
	const { churchId } = useChurchIdStore();

	const handleInputChange = useCallback(
		(field: string, value: string | number | boolean) => {
			dispatch(updateTempMemberField({ field, value }));
		},
		[dispatch]
	);

	const dropDown = useMemo(
		() => [
			{
				text: "Member Status",
				items: ["active", "inactive"],
				onSelect: (value: string) => handleInputChange("profile.active", value === "active"),
				value: tempMember?.profile?.active ? "active" : "inactive",
			},
			{
				text: "Worker Type",
				items: ["Pastor", "Deacon", "Deaconess", "Elder", "Member", "undefined"],
				onSelect: (value: string) => handleInputChange("profile.worker", value),
				value: tempMember?.profile?.worker,
			},
			{
				text: "Service Unit/Group",
				items: [
					"Usher",
					"Attendance",
					"Choir",
					"Media",
					"Technical",
					"Security",
					"Children",
					"Decoration",
					"Prayer",
					"Finance",
					"Welfare",
					"Evangelism",
					"Hospitality",
					"Transport",
					"Sanitation",
					"Protocol",
					"Counseling",
					"Youth",
					"undefined",
				],
				onSelect: (value: string) => handleInputChange("profile.serviceUnit", value),
				value: tempMember?.profile?.serviceUnit,
			},
		],
		[handleInputChange, tempMember?.profile]
	);

	const handleSave = useCallback(() => {
		if (!tempMember?.profile?.firstName || !tempMember.profile.lastName) {
			notify("First Name and Last Name are compulsory");
			return;
		}

		if (!tempMember?.profile?.gender) {
			notify("Gender is compulsory");
			return;
		}

		if (!tempMember?.profile?.dateOfBirth) {
			notify("Date of Birth is compulsory");
			return;
		}

		if (
			tempMember?.profile?.phone?.mainPhone === "+234" ||
			!tempMember?.profile?.phone?.mainPhone
		) {
			notify("Phone Number is compulsory");
			return;
		}
		try {
			dispatch(
				addMember({
					churchId: churchId,
					member: tempMember,
				})
			);
		} catch (err) {
			notify("Failed to add member");
		}
	}, [tempMember, dispatch, churchId]);

	useEffect(() => {
		if (status === "succeeded") {
			navigate("/admin/directory");
		}
	}, [status, navigate]);

	return (
		<div className="mt-5 flex flex-col">
			{dropDown.map((item) => (
				<DropDownInput
					key={item.text}
					text={item.text}
					items={item.items}
					onSelect={item.onSelect}
					value={item.value}
				/>
			))}
			<div className="flex justify-between">
				<button
					className="flex mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
					onClick={() => navigate("/admin/directory/add-member/contact-information")}
					disabled={status === "loading"}>
					<p className="text-lg">Previous</p>
				</button>
				<button
					className="flex mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
					onClick={handleSave}
					disabled={status === "loading"}>
					{status !== "loading" ? (
						<p className="text-lg">Save</p>
					) : (
						<ThreeDots height="25" width="50" color="#fff" />
					)}
				</button>
			</div>
		</div>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(EditProfileChurchInfo);
