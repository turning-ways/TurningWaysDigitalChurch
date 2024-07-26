import Header from "../../Header";
import SubHeader from "../../SubHeader";
import InformationHeader from "../InformationHeader";
import OverviewContainer from "../../OverviewContainer";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Notes from "./Notes";
import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import ChurchInformation from "./ChurchInformation";
import MembershipHistory from "./MembershipHistory";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { fetchMemberDetails } from "../../../../slices/memberSlice";
import { useChurchIdStore } from "../../../../stores/churchId";

const MembershipProfile = () => {
	const location = useLocation();
	const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
	const memberId = useMemo(() => queryParams.get("id"), [queryParams]);

	const dispatch = useDispatch<AppDispatch>();
	const status = useSelector((state: RootState) => state.members.status);
	const { churchId } = useChurchIdStore();

	const routes = useMemo(
		() => ({
			personalInfo: `/admin/directory/member/personal-information?id=${memberId}`,
			contactInfo: `/admin/directory/member/contact-information?id=${memberId}`,
			churchInfo: `/admin/directory/member/church-information?id=${memberId}`,
			membershipHistory: `/admin/directory/member/membership-history?id=${memberId}`,
		}),
		[memberId]
	);

	const [openNote, setOpenNote] = useState<boolean>(false);
	const notesRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (memberId) {
			dispatch(fetchMemberDetails({ churchId, memberId }));
		}
	}, [dispatch, churchId, memberId]);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (notesRef.current && !notesRef.current.contains(event.target as Node)) {
			setOpenNote(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	const locationPath = useMemo(() => location.pathname, [location.pathname]);

	return (
		<OverviewContainer active="Directory">
			{status !== "loading" ? (
				<>
					<Header text="Profile" />
					<SubHeader onNoteClick={() => setOpenNote(true)} />
					<InformationHeader route={routes} />
					{locationPath === "/admin/directory/member/personal-information" && (
						<PersonalInformation />
					)}
					{locationPath === "/admin/directory/member/contact-information" && <ContactInformation />}
					{locationPath === "/admin/directory/member/church-information" && <ChurchInformation />}
					{locationPath === "/admin/directory/member/membership-history" && <MembershipHistory />}
					<div ref={notesRef}>
						<Notes openNote={openNote} onClose={() => setOpenNote(false)} />
					</div>
				</>
			) : (
				<div>
					<ThreeDots height="25" width="50" color="#000" />
				</div>
			)}
		</OverviewContainer>
	);
};

export default MembershipProfile;
