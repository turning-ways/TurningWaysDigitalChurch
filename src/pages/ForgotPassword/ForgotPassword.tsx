import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthContainer from "../../ui/Container/AuthContainer";
import Header from "../../ui/Heading/Header";
import HeaderTwo from "../../ui/Heading/HeaderTwo";
import { useForgotPassword } from "../../hooks/usePassword";
import NextButton from "../../ui/Button/NextButton";
import { useUserDetailsStore } from "../../stores/user";

const ForgotPassword = () => {
  const schema = z.object({
    inputKey: z.string(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { setEmail } = useUserDetailsStore();

  const { mutate, isPending } = useForgotPassword();

  return (
    <>
      <AuthContainer center="sm:items-center h-screen pt-16 md:pt-0">
        <form
          onSubmit={handleSubmit((data) => {
            const { inputKey } = data;
            setEmail(inputKey.replace("+", ""));
            mutate({ inputKey });
          })}
        >
          <div className="space-y-2 mb-10">
            <p>
              <span className="text-[#446DE3] text-2xl">1</span> of 3
            </p>
            <Header> Reset your Password</Header>

            <p className="text-[#949995]">
              Kindly enter the email address or phone number you used to
              register
            </p>
          </div>
          <div className="mb-6 w-auto">
            <HeaderTwo>E-mail or Phone number</HeaderTwo>
            <input
              {...register("inputKey")}
              type="text"
              className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full p-3 outline-none placeholder-[#4A5568]"
              placeholder="example@gmail.com or 2340000000000"
            />
          </div>
          <NextButton isPending={isPending} />
        </form>
      </AuthContainer>
    </>
  );
};

export default ForgotPassword;
