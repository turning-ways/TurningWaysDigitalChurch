import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import AuthContainer from "../../../components/Container/AuthContainer";
import { HiMiniEye } from "react-icons/hi2";
import { HiEyeSlash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import useRegister from "../../../hooks/useRegister";
import { FiPhone } from "react-icons/fi";

interface Password {
  password: boolean;
  reEnterPassword: boolean;
}

const LoginWithEmail = () => {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password should be atleast 5 characters long" }),
    passwordConfirm: z
      .string()
      .min(5, { message: "Password should be atleast 5 characters long" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [show, setShow] = useState<Password>({
    password: true,
    reEnterPassword: true,
  });
  const navigate = useNavigate();
  const { mutate } = useRegister();
  const iconStyle = {
    color: "#718096",
  };
  return (
    <>
      <AuthContainer center="sm:items-center">
        <form
          onSubmit={handleSubmit((data) => {
            const { email, password, passwordConfirm } = data;
            mutate({ email, password, passwordConfirm });
          })}
        >
          <div className=" mb-10">
            <Header>Sign In</Header>
            <p className="text-[#949995] text-base lg:text-[18px]">
              Don't have an account?{" "}
              <button
                className="text-secondary underline underline-offset-[3px] cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Create One
              </button>
            </p>
          </div>
          <div className="mb-6">
            <HeaderTwo>Email</HeaderTwo>
            <input
              {...register("email")}
              type="text"
              className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full p-3 outline-none placeholder-[#4A5568]"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mb-6">
            <HeaderTwo>Password</HeaderTwo>
            <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ">
              <input
                {...register("password")}
                type={show.password ? "text" : "password"}
                className="outline-none w-full h-auto bg-inherit placeholder-[#4A5568] "
                placeholder="*****"
              />
              <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
              <div
                onClick={() => setShow({ ...show, password: !show.password })}
                className="mx-2"
              >
                {show.password ? (
                  <HiMiniEye className="cursor-pointer" style={iconStyle} />
                ) : (
                  <HiEyeSlash style={iconStyle} />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center my-10 text-sm lg:text-base">
            <div className="text-[#718096] flex items-center space-x-2">
              <input type="checkbox" />
              <p>remember me</p>
            </div>
            <div
              className="text-[#61BD74] underline underline-offset-[3px] cursor-pointer "
              onClick={() => navigate("/forgotpassword")}
            >
              Forget Password?
            </div>
          </div>
          {/* </div> */}
          <button className="w-full py-3 text-center bg-primaryDark hover:bg-primary text-xl lg:text-2xl font-medium rounded-[10px] lg:rounded-[20px] text-white">
            Next
          </button>
          <div className="flex items-center my-5 text-[#718096] w-full lg:max-w-[550px]">
            <div className="w-full h-[1px] bg-[#A0AEC0]" />
            <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
            <div className="w-full h-[1px] bg-[#A0AEC0]" />
          </div>

          <div
            className="border mb-5 border-[#CBD5E0] rounded-[30px] py-3 flex px-5 justify-center space-x-3 items-center w-full lg:max-w-[550px] cursor-pointer"
            onClick={() =>
              navigate(
                "https://digital-church.onrender.com/api/v1/users/auth/google/admin"
              )
            }
          >
            <img src="../../../public/assets/images/Rectangle.svg" alt="" />
            <p className=" text-center text-[#67728A] text-sm lg:text-xl font-medium">
              Continue with google
            </p>
          </div>
          <div
            className="border border-[#CBD5E0] rounded-[30px] py-2 lg:py-3 flex px-5 justify-center space-x-3 items-center w-full lg:max-w-[550px] cursor-pointer"
            onClick={() => navigate("/login-with-number")}
          >
            <FiPhone style={{ fontSize: "20px" }} />
            <p className=" text-center text-[#67728A] text-sm lg:text-xl font-medium">
              Continue with phone
            </p>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default LoginWithEmail;
