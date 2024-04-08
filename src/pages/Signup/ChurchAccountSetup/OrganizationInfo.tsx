// import { IoIosArrowBack } from "react-icons/io";
import AuthContainer from "../../../components/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";

const OrganizationInfo = () => {
  const navigate = useNavigate();

  return (
    <>
      <AuthContainer>
        <form>
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
              />
            </div>
            <div className="mb-6 w-full">
              <div className="flex items-center justify-between">
                <HeaderTwo>Is this a parent church</HeaderTwo>
                <BsFillQuestionCircleFill className="cursor-pointer" />
              </div>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ">
                <input
                  className="outline-none w-full h-auto bg-inherit  "
                  placeholder="No"
                />
                <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />

                <TiArrowSortedDown className="cursor-pointer text-3xl" />
              </div>
            </div>
          </div>
          <button
            className="w-full py-3 text-center bg-primaryDark hover:bg-primary text-xl font-medium mt-5 rounded-[20px] text-white mb-3 "
            onClick={() => navigate("/churchinfo")}
          >
            Next
          </button>
        </form>
      </AuthContainer>
    </>
  );
};

export default OrganizationInfo;
