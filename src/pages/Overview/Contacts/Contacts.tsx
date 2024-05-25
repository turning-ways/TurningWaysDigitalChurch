import { RxDashboard } from "react-icons/rx";
import QuickActions from "../../../components/Actions/QuickActions";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { PiListDashesBold } from "react-icons/pi";
import AllContactsList from "./AllContactsList";
import AllContactsGallery from "./AllContactsGallery";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const [activeView, setActiveView] = useState("list");
  const navigate = useNavigate();
  return (
    <OverviewContainer active="Contacts">
      <Header text="Contacts" />
      <QuickActions display="hidden md:flex" />
      {/* SOME COMPONENT */}
      <div className="md:flex justify-between mb-10">
        <button
          className="rounded-[15px] border border-[#17275B] px-5 py-3 space-x-2 text-[#17275B] flex items-center my-10 md:my-0"
          onClick={() => navigate("/admin/contacts/detail")}
        >
          <HiMiniPlusCircle className="text-[21px]" />
          <p className="font-medium">Add Contact</p>
        </button>
        <div className="flex space-x-4 w-full md:w-fit">
          <button
            className={`flex space-x-2 items-center justify-center text-sm md:text-base  rounded-sm py-2 px-3 w-1/2 md:w-fit ${
              activeView === "list"
                ? "text-white text-lg bg-[#041E71] "
                : "text-[#041E71] bg-white text-lg border border-[#041E71]"
            }`}
            onClick={() => setActiveView("list")}
          >
            <PiListDashesBold className="text-xl" />
            <p>List View</p>
          </button>
          <button
            className={`flex space-x-2 items-center justify-center text-sm md:text-base rounded-sm py-2 px-3 w-1/2 md:w-fit ${
              activeView === "gallery"
                ? "text-white text-lg bg-[#041E71] "
                : "text-[#041E71] bg-white text-lg border border-[#041E71]"
            }`}
            onClick={() => setActiveView("gallery")}
          >
            <RxDashboard />
            <p>Gallery View</p>
          </button>
        </div>
      </div>
      {/* ANOTHER COMPONENT */}

      {activeView === "list" ? <AllContactsList /> : <AllContactsGallery />}
    </OverviewContainer>
  );
};

export default Contacts;
