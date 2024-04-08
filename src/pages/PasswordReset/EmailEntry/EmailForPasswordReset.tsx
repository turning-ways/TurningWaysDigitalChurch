import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Container/AuthContainer";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";

const EmailForPasswordReset = () => {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password should be atleast 5 characters long" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    // handleSubmit,
    // formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  return (
    <>
      <AuthContainer center="items-center ">
        <form>
          {/* <div
            className="bg-[#F4F8F3] rounded-lg p-2 w-fit mb-4 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <IoIosArrowBack className=" text-2xl w-auto" />
          </div> */}
          <div className="space-y-2 mb-10">
            <p>
              <span className="text-[#446DE3] text-2xl">1</span> of 3
            </p>
            <Header> Reset your Password</Header>

            <p className="text-[#949995]">
              Kindly enter the email address you used to register
            </p>
          </div>
          <div className="mb-6 w-auto">
            <HeaderTwo>E-mail</HeaderTwo>
            <input
              {...register("email")}
              type="text"
              className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full p-3 outline-none placeholder-[#4A5568]"
              placeholder="example@gmail.com"
            />
          </div>
          <button
            className="w-full py-3 text-center bg-[#446DE3] mt-10 rounded-[20px] text-white font-medium text-xl"
            onClick={() => navigate("/password-reset/otp-verification")}
          >
            Next
          </button>
        </form>
      </AuthContainer>
    </>
  );
};

export default EmailForPasswordReset;
