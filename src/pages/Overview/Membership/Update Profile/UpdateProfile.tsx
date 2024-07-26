import Header from "../../Header";
import SubHeader from "./SubHeader";
import { useLocation } from "react-router-dom";

// import ProfileEditButton from "../../../../components/Button/ProfileEditButton";
import AddUpdateInfoHeader from "../AddUpdateInfoHeader";
import OverviewContainer from "../../OverviewContainer";
import UpdatePersonalInfo from "./UpdatePersonalInfo";
import UpdateContactInfo from "./UpdateContactInfo";
import UpdateChurchInfo from "./UpdateChurchInfo";

const UpdateProfile = () => {
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);
	const memberId = queryParams.get("id");
	const routes = {
		personalInfo: `/admin/directory/update-member/personal-information?id=${memberId}`,

		contactInfo: `/admin/directory/update-member/contact-information?id=${memberId}`,

		churchInfo: `/admin/directory/update-member/church-information?id=${memberId}`,
	};

	return (
		<OverviewContainer active="Directory">
			<Header text="Update Profile" />
			<SubHeader />
			<AddUpdateInfoHeader route={routes} />
			{location.pathname === "/admin/directory/update-member/personal-information" && (
				<UpdatePersonalInfo />
			)}
			{location.pathname === "/admin/directory/update-member/contact-information" && (
				<UpdateContactInfo />
			)}
			{location.pathname === "/admin/directory/update-member/church-information" && (
				<UpdateChurchInfo />
			)}

			{/* <ProfileEditButton text={"Update Profile"} onPress={handleAddingMember} /> */}
		</OverviewContainer>
	);
};

export default UpdateProfile;
