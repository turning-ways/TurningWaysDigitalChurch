import AuthContainer from "../../components/Container/AuthContainer";
import Header from "../../components/Heading/Header";
import HeaderTwo from "../../components/Heading/HeaderTwo";

const PasswordReset = () => {
  return (
    <>
      <AuthContainer center="items-center">
        <form>
          <div>
            <div className="space-y-2 mb-10">
              <p>
                <span className="text-[#446DE3] text-2xl">3</span> of 3
              </p>
              <Header>Set a new password</Header>
              <p className="text-[#949995]">Kindly enter your new password</p>
            </div>
            <div className="mb-6">
              <HeaderTwo>Password</HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full p-3 outline-none placeholder-[#4A5568] placeholder:font-azeret"
                placeholder="T*********"
              />
            </div>
            <div className="mb-6">
              <HeaderTwo>Re-Enter Password</HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full p-3 outline-none placeholder-[#4A5568] placeholder:font-azeret"
                placeholder="T*********"
              />
            </div>
            <button
              className="w-full py-3 text-center bg-[#446DE3] mt-10 text-xl rounded-[10px] lg:rounded-[20px] text-white"
              onClick={(e) => e.preventDefault()}
            >
              Reset Password
            </button>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default PasswordReset;
