import { RxDashboard } from "react-icons/rx";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import { PiListDashesBold } from "react-icons/pi";
import AllContactsList from "./AllContactsList";
import AllContactsGallery from "./AllContactsGallery";
import { useEffect, useState } from "react";
import AddContact from "./AddContact";
import QuickActionsContact from "../../../ui/Actions/QuickActionsContact";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useChurchIdStore } from "../../../stores/churchId";
import { fetchContacts } from "../../../slices/contactSlice";

const Contacts: React.FC = () => {
  const { churchId } = useChurchIdStore();
  const dispatch = useDispatch<AppDispatch>();

  const [activeView, setActiveView] = useState("list");

  useEffect(() => {
    if (churchId) {
      dispatch(fetchContacts(churchId));
    }
  }, [churchId, dispatch]);

  const handleToggleView = (view: string) => {
    setActiveView(view);
  };

  return (
    <>
      <OverviewContainer active="Contacts">
        <Header text="Contacts" />
        <QuickActionsContact display="hidden md:flex" />
        <div className="md:flex justify-between mb-10">
          <AddContact />
          <div className="flex space-x-4 w-full md:w-fit">
            <button
              className={`flex space-x-2 items-center justify-center text-sm md:text-base  rounded-sm py-2 px-3 w-1/2 md:w-fit ${
                activeView === "list"
                  ? "text-white text-lg bg-[#041E71]"
                  : "text-[#041E71] bg-white text-lg border border-[#041E71]"
              }`}
              onClick={() => handleToggleView("list")}>
              <PiListDashesBold className="text-xl" />
              <p>List View</p>
            </button>
            <button
              className={`flex space-x-2 items-center justify-center text-sm md:text-base rounded-sm py-2 px-3 w-1/2 md:w-fit ${
                activeView === "gallery"
                  ? "text-white text-lg bg-[#041E71]"
                  : "text-[#041E71] bg-white text-lg border border-[#041E71]"
              }`}
              onClick={() => handleToggleView("gallery")}>
              <RxDashboard />
              <p>Gallery View</p>
            </button>
          </div>
        </div>

        {activeView === "list" ? <AllContactsList /> : <AllContactsGallery />}
      </OverviewContainer>
    </>
  );
};

export default Contacts;
