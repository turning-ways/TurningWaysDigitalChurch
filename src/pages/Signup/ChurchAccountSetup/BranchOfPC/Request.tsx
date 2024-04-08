// import { IoIosArrowBack } from "react-icons/io";
import AuthContainer from "../../../../components/Container/AuthContainer";
import Header from "../../../../components/Heading/Header";

const Request = () => {

  return (
    <>
      <AuthContainer center="items-center">
        <form>
          <div className="mb-10 text-center">
            <Header>Request Sent</Header>
            <p className="text-[#949995]">
              A request has been sent to the admin of winners chapel Church,
              kindly your email for further instructions
            </p>
          </div>
          <div className="w-full h-60 sm:h-80 bg-[#C4C4C4] rounded-[50px]" />
          <button className="w-full py-3 text-center bg-primaryDark hover:bg-primary text-xl font-medium mt-5 rounded-[20px] text-white mb-3 " onClick={(e) => e.preventDefault() }>
            Next
          </button>
        </form>
      </AuthContainer>
    </>
  );
};

export default Request;
