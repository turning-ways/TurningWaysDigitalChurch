import AuthContainer from "../../../components/Container/AuthContainer";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";

import { useState } from "react";
import NextButton from "../../../components/Button/NextButton";
import DropDownMenu from "../../../components/DropDownMenu/DropDownMenu";
import { roles, hearAboutUs } from "../../../constants/constants";
import { useMemberStore } from "../../../stores/member";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../hooks/useLogin";
// import useAddMember from "../../../hooks/AddMember/useAddMember";

const PersonalInfo = () => {
  const [phone, setPhone] = useState("");
  const [showRoles, setShowRoles] = useState<boolean>(false);
  const [showHearAbout, setShowHearAbout] = useState<boolean>(false);

  // const { mutate, isPending } = useAddMember();
  const [hear, setHear] = useState("");
  const [roleValue, setRoleValue] = useState("");

  const handleSelectHearAbout = (selectedItem: string) => {
    setHear(selectedItem);
    setShowHearAbout(false);
  };

  const handleSelectRoles = (selectedItem: string) => {
    setRoleValue(selectedItem);
    setShowRoles(false);
  };

  // const { mutate, isPending } = useAddMember();

  const { setPhoneNumber, setHowDidYouHear, setRole } = useMemberStore();

  //navigation
  const navigate = useNavigate();

  const isNumeric = (value: string) => {
    return /^0\d{10}$/.test(value);
  };

  return (
    <>
      <AuthContainer center={" h-screen"}>
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            setPhoneNumber({ MainPhone: phone });
            setHowDidYouHear(hear);
            setRole(roleValue);

            if (phone !== "" && hear !== "" && roleValue !== "") {
              if (isNumeric(phone)) {
                navigate("/organizationinfo");
              } else {
                notify("Please enter a valid phone number");
              }
            } else {
              notify("Please fill in all details");
            }
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
                <input
                  type="text"
                  className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-r-xl w-full p-3 outline-none "
                  placeholder="7043210987"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <HeaderTwo>What is your role in church?</HeaderTwo>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center">
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
                />
              )}
            </div>
            <div className="relative">
              <HeaderTwo>How did you hear about us?</HeaderTwo>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center">
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
