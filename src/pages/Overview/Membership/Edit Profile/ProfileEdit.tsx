import { useLocation } from "react-router-dom";
import Header from "../../Header";
import OverviewContainer from "../../OverviewContainer";
import SubHeader from "./SubHeader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { clearMemberDetails } from "../../../../slices/memberSlice";
// import ProfileEditButton from "../../../../components/Button/ProfileEditButton";

import AddUpdateInfoHeader from "../AddUpdateInfoHeader";
import EditProfilePersonalInfo from "./EditProfilePersonalInfo";
import EditProfileContactInfo from "./EditProfileContactInfo";
import EditProfileChurchInfo from "./EditProfileChurchInformation";
import { useEffect } from "react";

const ProfileEdit = () => {
	const routes = {
		personalInfo: "/admin/directory/add-member/personal-information",
		contactInfo: "/admin/directory/add-member/contact-information",
		churchInfo: "/admin/directory/add-member/church-information",
	};
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();

	useEffect(() => {
		return () => {
			dispatch(clearMemberDetails());
		};
	}, []);

	return (
		<OverviewContainer active="Directory">
			<Header text="New Member Profile" />
			<SubHeader />
			<AddUpdateInfoHeader route={routes} />

			{location.pathname === routes.personalInfo && <EditProfilePersonalInfo />}

			{location.pathname === routes.contactInfo && <EditProfileContactInfo />}

			{location.pathname === routes.churchInfo && <EditProfileChurchInfo />}
			{/* <ProfileEditButton text="Save" onPress={handleAddingMember} /> */}
		</OverviewContainer>
	);
};

export default ProfileEdit;
