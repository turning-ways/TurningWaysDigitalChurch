import AuthContainer from "../../../components/Container/AuthContainer";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdatePassword from "../../../hooks/useUpdatePassword";

const PasswordReset = () => {
  const schema = z.object({
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

  const { mutate } = useUpdatePassword();

  return (
    <>
      <AuthContainer center="sm:items-center">
        <form
          onSubmit={handleSubmit((data) => {
            const { password, passwordConfirm } = data;
            mutate({ password, passwordConfirm });
            console.log("clicked");
          })}
        >
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
                {...register("password")}
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full p-3 outline-none placeholder-[#4A5568] placeholder:font-azeret"
                placeholder="T*********"
              />
            </div>
            <div className="mb-6">
              <HeaderTwo>Re-Enter Password</HeaderTwo>
              <input
                {...register("passwordConfirm")}
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full p-3 outline-none placeholder-[#4A5568] placeholder:font-azeret"
                placeholder="T*********"
              />
            </div>
            <button
              className="w-full py-3 text-center bg-[#446DE3] mt-10 text-xl rounded-[10px] lg:rounded-[20px] text-white"
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
