import AuthContainer from "../../components/Container/AuthContainer";
import Header from "../../components/Heading/Header";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdatePassword from "../../hooks/useUpdatePassword";
import NextButton from "../../components/Button/NextButton";
import PasswordInput from "../../components/Input/PasswordInput";

const ResetPassword = () => {
  const schema = z.object({
    password: z
      .string()
      .min(5, { message: "Password should be atleast 5 characters long" }),
    passwordConfirm: z
      .string()
      .min(5, { message: "Should be atleast 5 characters long" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useUpdatePassword();

  return (
    <>
      <AuthContainer center="sm:items-center h-screen pt-16 md:pt-0">
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
              <PasswordInput heading="Password" name="password" register={register} placeholder="********" formError={errors.password?.message}/>

              <PasswordInput heading="Re-Enter Password" name="passwordConfirm" register={register} placeholder="********" formError={errors.passwordConfirm?.message} />
              
            <NextButton isPending={isPending}/>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default ResetPassword;
