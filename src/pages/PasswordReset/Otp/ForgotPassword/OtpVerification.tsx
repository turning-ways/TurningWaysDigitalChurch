import AuthContainer from "../../../../components/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../../../components/OtpInput";
import Header from "../../../../components/Heading/Header";

const OtpVerification = () => {
  const navigate = useNavigate();

  return (
    <>
      <AuthContainer center="items-center">
        <form>
          <div className="space-y-2 mb-10">
            <p>
              <span className="text-[#446DE3] text-2xl">2</span> of 3
            </p>
            <Header>Check your email</Header>
            <p className="text-[#949995]">
              Kindly enter the verification code (OTP) sent to your emial
              address
            </p>
          </div>
          <div className="mb-6 flex justify-between max-w-[550px] space-x-4">
            <OtpInput />
          </div>
          <button
            className="w-full py-3 text-center bg-[#446DE3] text-xl font-medium mt-10 rounded-[20px] text-white mb-3 max-w-[500px]"
            onClick={() => navigate("/password-reset/set-new-password")}
          >
            Verify
          </button>
          <p>
            Didn't get a code?{" "}
            <span className="text-[#CCE9D1] cursor-pointer">Resend Code</span>
          </p>
        </form>
      </AuthContainer>
    </>
  );
};

export default OtpVerification;
