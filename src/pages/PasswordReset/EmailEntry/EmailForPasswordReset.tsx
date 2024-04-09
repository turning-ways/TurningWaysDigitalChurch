import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthContainer from "../../../components/Container/AuthContainer";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import useForgotPassword from "../../../hooks/useForgotPassword";

const EmailForPasswordReset = () => {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useForgotPassword();

  return (
    <>
      <AuthContainer center="sm:items-center ">
        <form
          onSubmit={handleSubmit((data) => {
            const { email } = data;
            mutate({email});
          })}
        >
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
          >
            Next
          </button>
        </form>
      </AuthContainer>
    </>
  );
};

export default EmailForPasswordReset;
