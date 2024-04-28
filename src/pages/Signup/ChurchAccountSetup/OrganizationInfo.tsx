// import { IoIosArrowBack } from "react-icons/io";
import AuthContainer from "../../../components/Container/AuthContainer";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";
import { useMemberStore } from "../../../stores/member";
import { useState } from "react";
import DropDownMenu from "../../../components/DropDownMenu/DropDownMenu";
import { useNavigate } from "react-router-dom";

const OrganizationInfo = () => {
  const [show, setShow] = useState<boolean>(false);

  const [churchValue, setChurchValue] = useState("");
  const [isParentChurchValue, setIsParentChurchValue] = useState("");

  const { setChurchName, setIsParentChurch } = useMemberStore();

  const handleSelectedItem = (selectedItem: string) => {
    setIsParentChurchValue(selectedItem);
    setShow(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <AuthContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setChurchName(churchValue);
            setIsParentChurch(isParentChurchValue);
            navigate("/register/churchinfo");
          }}
        >
          <div className="space-y-2 mb-10">
            {" "}
            <p>
              <span className="text-[#446DE3] text-2xl">2</span> of 3
            </p>
            <Header>Church Account Setup</Header>
            <p className="text-[#949995]">Kindly fill in your church details</p>
          </div>
          <div className="mb-6">
            <div className="mb-6 w-full">
              <HeaderTwo>Your church organization or name</HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full p-3 outline-none  "
                placeholder="Winners Chapel Magodo"
                value={churchValue}
                onChange={(e) => setChurchValue(e.target.value)}
              />
            </div>
            <div className="relative">
              <HeaderTwo>Is this a parent church?</HeaderTwo>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center">
                <input
                  className="outline-none w-full h-auto bg-inherit"
                  placeholder="Yes / No"
                  value={isParentChurchValue}
                  readOnly={true}
                  onChange={(e) => setIsParentChurchValue(e.target.value)}
                />
                <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
                <TiArrowSortedDown
                  className="cursor-pointer text-3xl"
                  onClick={() => setShow(!show)}
                />
              </div>
              {show && (
                <DropDownMenu
                  onSelect={handleSelectedItem}
                  dropdownItems={["Yes", "No"]}
                />
              )}
            </div>
          </div>
          <button className="w-full py-3 text-center bg-primaryDark hover:bg-primary text-xl font-medium mt-5 rounded-[20px] text-white mb-3 ">
            Next
          </button>
        </form>
      </AuthContainer>
    </>
  );
};

export default OrganizationInfo;
