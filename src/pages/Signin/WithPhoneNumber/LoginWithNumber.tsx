import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../../components/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";
import googleLogo from "/assets/images/Rectangle.svg";
import { FaRegEnvelope } from "react-icons/fa6";

const LoginWithNumber = () => {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password should be atleast 5 characters long" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    // register,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const { mutate } = useLogin();
  return (
    <>
      <AuthContainer center="sm:items-center">
        <form
          className="flex flex-col space-y-36"
          onSubmit={handleSubmit((data) => {
            const { email, password } = data;
            mutate({ email, password });
          })}
        >
          <div>
            <div className=" mb-10">
              <Header>Sign In</Header>
              <p className="text-[#949995] text-base lg:text-[18px]">
                Don't have an account?{" "}
                <button
                  className="text-[#A0D7AB] underline underline-offset-[3px] cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Create now
                </button>
              </p>
            </div>
            <div className="mb-2">
              <HeaderTwo>Phone Number</HeaderTwo>
              <div className="flex">
                <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-l-xl px-2 sm:px-3 py-1 mr-3 min-w-[100px] w-[100px] flex items-center ">
                  <input
                    className="outline-none w-full bg-inherit placeholder-[#4A5568]"
                    placeholder="+234"
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
            <div className="flex justify-between items-center my-10 text-sm lg:text-base">
              <div className="text-[#718096] flex items-center space-x-2">
                <input type="checkbox" />
                <p>remember me</p>
              </div>
              <div
                className="text-[#61BD74] underline underline-offset-[3px] cursor-pointer "
                onClick={() => navigate("/password-reset/email-entry")}
              >
                Forget Password?
              </div>
            </div>
            <button className="w-full py-3 text-center bg-[#446DE3] text-xl lg:text-2xl font-medium rounded-[10px] lg:rounded-[20px] text-white">
              Sign In
            </button>
          </div>
          <div className="">
            <div className="flex items-center my-5 text-[#718096] w-full lg:max-w-[550px]">
              <div className="w-full h-[1px] bg-[#A0AEC0]" />
              <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
              <div className="w-full h-[1px] bg-[#A0AEC0]" />
            </div>
            <div
              className="border mb-5 border-[#CBD5E0] rounded-[10px] py-2 lg:py-3 flex px-5 justify-center space-x-3 items-center w-full lg:max-w-[550px] cursor-pointer"
              onClick={() =>
                navigate(
                  "https://digital-church.onrender.com/api/v1/users/auth/google/admin"
                )
              }
            >
              <img src={googleLogo} alt="" />
              <p className=" text-center text-[#67728A] text-sm lg:text-xl font-medium">
                Continue with google
              </p>
            </div>
            <div
              className="border border-[#CBD5E0] rounded-[10px] py-2 lg:py-3 flex px-5 justify-center space-x-3 items-center w-full lg:max-w-[550px] cursor-pointer"
              onClick={() => navigate("/login-with-email")}
            >
              <FaRegEnvelope style={{ fontSize: "20px" }} />
              <p className=" text-center text-[#67728A] text-sm lg:text-xl font-medium">
                Continue with email
              </p>
            </div>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default LoginWithNumber;
