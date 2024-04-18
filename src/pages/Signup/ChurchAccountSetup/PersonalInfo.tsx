import AuthContainer from "../../../components/Container/AuthContainer";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";

import { useState } from "react";
import NextButton from "../../../components/Button/NextButton";
import DropDownMenu from "../../../components/DropDownMenu/DropDownMenu";
import { roles, hearAboutUs } from "../../../constants/constants";
import useAddMember from "../../../hooks/AddMember/useAddMember";

const PersonalInfo = () => {
  const [phone, setPhone] = useState<string>("");
  const [showRoles, setShowRoles] = useState<boolean>(true);
  const [showHearAbout, setShowHearAbout] = useState<boolean>(true);

  // const { mutate, isPending } = useAddMember();
  const [howDidYouHear, setHowDidYouHear] = useState("");
  const [role, setRole] = useState("");

  const handleSelectHearAbout = (selectedItem: string) => {
    setHowDidYouHear(selectedItem);
    setShowHearAbout(false);
  };

  const handleSelectRoles = (selectedItem: string) => {
    setRole(selectedItem);
    setShowRoles(false);
  };

  const { mutate, isPending } = useAddMember();

  return (
    <>
      <AuthContainer center={" h-screen"}>
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            console.log("works");
            mutate({
              role,
              howDidYouHear: howDidYouHear,
              phone: { MainPhone: phone },
            });
          }}
        >
          <div className="mb-5 max-w-[550px] mx-auto">
            <p>
              <span className="text-[#446DE3] text-2xl">1</span> of 3
            </p>
            <Header>Church Account Setup</Header>
            <p className="text-[#949995]">
              Kindly fill in the admin details below
            </p>
          </div>
          <div className="space-y-8 mb-10">
            <div className="mb-2">
              <HeaderTwo>Phone Number</HeaderTwo>

              <div className="flex">
                <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-l-xl px-2 sm:px-3 py-1 mr-3 min-w-[80px] w-[80px] sm:w-[130px] flex items-center ">
                  <input
                    className="outline-none w-full bg-inherit placeholder-[#4A5568]"
                    placeholder="+234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div className="border-l border-l-[#CFD9E0] h-8 mx-1 lg:mx-2" />
                  <div className="">
                    <TiArrowSortedDown className="cursor-pointer sm:text-xl" />
                  </div>
                </div>
                <input
                  type="text"
                  className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-r-xl w-full p-3 outline-none "
                  placeholder="7043210987"
                />
              </div>
            </div>

            <div className="relative">
              <HeaderTwo>What is your role in church?</HeaderTwo>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center">
                <input
                  className="outline-none w-full h-auto bg-inherit"
                  placeholder="Social Media"
                  value={role}
                  readOnly={true}
                  onChange={(e) => setRole(e.target.value)}
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
                />
              )}
            </div>
            <div className="relative">
              <HeaderTwo>How did you hear about us?</HeaderTwo>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center">
                <input
                  className="outline-none w-full h-auto bg-inherit"
                  placeholder="Social Media"
                  value={howDidYouHear}
                  readOnly={true}
                  onChange={(e) => setHowDidYouHear(e.target.value)}
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
                />
              )}
            </div>
          </div>
          <NextButton isPending={isPending} />
        </form>
      </AuthContainer>
    </>
  );
};

export default PersonalInfo;
