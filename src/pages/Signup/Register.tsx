import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import AuthContainer from "../../components/Container/AuthContainer";
import { HiMiniEye } from "react-icons/hi2";
import { HiEyeSlash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Heading/Header";
import HeaderTwo from "../../components/Heading/HeaderTwo";
import { MdError } from "react-icons/md";
import { useUserDetailsStore } from "../../stores/user";
import useRegister from "../../hooks/Signup/useRegister";
import { ThreeDots } from "react-loader-spinner";
import GoogleButton from "../../components/Button/GoogleButton";

interface Password {
  password: boolean;
  reEnterPassword: boolean;
}

const Register = () => {
  const schema = z.object({
    first_name: z
      .string()
      .min(5, { message: "Name should be atleast 4 characters long" }),
    last_name: z
      .string()
      .min(5, { message: "Name should be atleast 4 characters long" }),
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [show, setShow] = useState<Password>({
    password: true,
    reEnterPassword: true,
  });
  const navigate = useNavigate();
  const iconStyle = {
    color: "#718096",
  };

  const { mutate, error, isPending } = useRegister();

  const { setEmail } = useUserDetailsStore();
  return (
    <>
      <AuthContainer center="sm:items-center">
        <form
          onSubmit={handleSubmit((data) => {
            const { first_name, last_name, email, password, passwordConfirm } =
              data;
            setEmail(email);
            mutate({ first_name, last_name, email, password, passwordConfirm });
          })}
        >
          <div className=" mb-10">
            <Header>Sign Up</Header>
            <p className="text-[#949995] text-base lg:text-[18px]">
              Already have an account?{" "}
              <span
                className="text-secondary underline underline-offset-[3px] cursor-pointer"
                onClick={() => navigate("/login-with-email")}
              >
                Sign in
              </span>
            </p>
          </div>
          <div className={`${errors.first_name ? "mb-4" : "mb-6"}`}>
            <HeaderTwo>First Name</HeaderTwo>
            <div
              className={`border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ${
                errors.first_name
                  ? "border-[#FF0000] border-2"
                  : "border-[#EBEFF9] border"
              }`}
            >
              <input
                {...register("first_name")}
                type="text"
                className="outline-none w-full bg-inherit placeholder-[#4A5568] h-10"
                placeholder="Temidire"
              />
              {errors.first_name && (
                <MdError style={{ color: "#FF0000", fontSize: 30 }} />
              )}
            </div>

            {errors.first_name && (
              <p className="text-[#FF0000]">{errors.first_name.message}</p>
            )}
          </div>
          <div className={`${errors.last_name ? "mb-4" : "mb-6"}`}>
            <HeaderTwo>Last Name</HeaderTwo>
            <div
              className={`border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ${
                errors.last_name
                  ? "border-[#FF0000] border-2"
                  : "border-[#EBEFF9] border"
              }`}
            >
              <input
                {...register("last_name")}
                type="text"
                className="outline-none w-full bg-inherit placeholder-[#4A5568] h-10"
                placeholder="Owoeye"
              />
              {errors.last_name && (
                <MdError style={{ color: "#FF0000", fontSize: 30 }} />
              )}
            </div>

            {errors.last_name && (
              <p className="text-[#FF0000]">{errors.last_name.message}</p>
            )}
          </div>
          <div className={`${errors.email || error ? "mb-4" : "mb-6"}`}>
            <HeaderTwo>Email</HeaderTwo>
            <div
              className={`border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ${
                errors.email || error
                  ? "border-[#FF0000] border-2"
                  : "border-[#EBEFF9] border"
              }`}
            >
              <input
                {...register("email")}
                type="email"
                className="outline-none w-full bg-inherit placeholder-[#4A5568] h-10"
                placeholder="temidireowoeye@gmail.com"
              />
              {(errors.email || error) && (
                <MdError style={{ color: "#FF0000", fontSize: 30 }} />
              )}
            </div>

            {error && (
              <p className="text-[#FF0000]">
                An account with this email already exists!
              </p>
            )}
            {errors.email && (
              <p className="text-[#FF0000]">Please enter a valid email</p>
            )}
          </div>
          <div className="mb-6">
            <HeaderTwo>Password</HeaderTwo>
            <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ">
              <input
                {...register("password")}
                type={!show.password ? "text" : "password"}
                className="outline-none w-full h-auto bg-inherit placeholder-[#4A5568] "
                placeholder="*****"
              />
              <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
              <div
                onClick={() => setShow({ ...show, password: !show.password })}
                className="mx-2"
              >
                {!show.password ? (
                  <HiMiniEye className="cursor-pointer" style={iconStyle} />
                ) : (
                  <HiEyeSlash style={iconStyle} />
                )}
              </div>
            </div>
          </div>
          <div>
            <HeaderTwo>Re-Enter Password</HeaderTwo>
            <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ">
              <input
                {...register("passwordConfirm")}
                type={!show.reEnterPassword ? "text" : "password"}
                className="outline-none w-full h-auto bg-inherit placeholder-[#4A5568] "
                placeholder="*****"
              />
              <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
              <div
                onClick={() =>
                  setShow({ ...show, reEnterPassword: !show.reEnterPassword })
                }
                className="mx-2"
              >
                {!show.reEnterPassword ? (
                  <HiMiniEye className="cursor-pointer" style={iconStyle} />
                ) : (
                  <HiEyeSlash style={iconStyle} />
                )}
              </div>
            </div>
          </div>
          <div className="text-[#718096] flex items-center space-x-2 my-8">
            <input type="checkbox" />
            <p>
              I agree to the{" "}
              <span className="text-secondary">Terms of Service</span> and the{" "}
              <span className="text-secondary">Privacy Policy</span>
            </p>
          </div>
          <button className="w-full py-3 bg-primaryDark hover:bg-primary text-md lg:text-xl font-medium rounded-[10px] lg:rounded-[20px] text-white flex justify-center">
            {!isPending ? (
              <p>Next</p>
            ) : (
              <ThreeDots height="25" width="50" color="#fff" />
            )}
          </button>
          <div className="flex items-center my-5 text-[#718096] w-full lg:max-w-[550px]">
            <div className="w-full h-[1px] bg-[#A0AEC0]" />
            <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
            <div className="w-full h-[1px] bg-[#A0AEC0]" />
          </div>
          <GoogleButton />
        </form>
      </AuthContainer>
    </>
  );
};

export default Register;
