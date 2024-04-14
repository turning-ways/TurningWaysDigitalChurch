import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthContainer from "../../../components/Container/AuthContainer";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";
import Input from "../../../components/Input/Input";

const PersonalInfo = () => {
  const schema = z.object({
    firstName: z
      .string()
      .min(5, { message: "Please name should contain atleast 4 characters" }),
    lastName: z.string().min(5, {
      message: "Please last name should contain atleast 4 characters",
    }),
    // phoneNumber: z
    //   .number()
    //   .min(10, { message: "Number should only contain 10 digits" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <AuthContainer center={"sm:items-center"}>
        <form
          className=""
          onSubmit={handleSubmit((data) => {
            const { firstName, lastName } = data;
            console.log(firstName, lastName);
          })}
          // onSubmit={() => {
          //   navigate("/organizationinfo");
          // }}
        >
          <div className="mb-5 max-w-[550px] mx-auto">
            <p>
              <span className="text-[#446DE3] text-2xl">1</span> of 3
            </p>
            <Header>Church Account Setup</Header>
            <p className="text-[#949995]">
              Kindly fill in the admin details below
            </p>
          </div>
          <div className="space-y-8">
            <Input
              heading="First Name"
              name="firstName"
              register={register}
              placeholder="Temidire"
              formError={errors.firstName?.message}
            />
            <Input
              heading="Last Name"
              name="lastName"
              register={register}
              placeholder="Owoeye"
              formError={errors.lastName?.message}
            />

            <div className="mb-2">
              <HeaderTwo>Phone Number</HeaderTwo>

              <div className="flex">
                <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-l-xl px-2 sm:px-3 py-1 mr-3 min-w-[80px] w-[80px] sm:w-1/5 flex items-center ">
                  <input
                    // {...register("phoneNumber")}
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

            <div className="mb-2">
              <HeaderTwo>What is your role in the church?</HeaderTwo>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ">
                <input
                  className="outline-none w-full h-auto bg-inherit  "
                  placeholder="Pastor"
                />
                <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />

                <TiArrowSortedDown className="cursor-pointer text-3xl" />
              </div>
            </div>
            <div className="mb-2 ">
              <HeaderTwo>How did you hear about us?</HeaderTwo>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ">
                <input
                  className="outline-none w-full h-auto bg-inherit  "
                  placeholder="Social Media"
                />
                <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />

                <TiArrowSortedDown className="cursor-pointer text-3xl" />
              </div>
            </div>
          </div>
          <button className="w-full py-3 mb-3 text-center bg-blue-600 my-10 rounded-[20px] text-white font-medium text-xl">
            Next
          </button>
        </form>
      </AuthContainer>
    </>
  );
};

export default PersonalInfo;
