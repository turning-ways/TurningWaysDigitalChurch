// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

import AuthContainer from "../../../components/Container/AuthContainer";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const PersonalInfo = () => {
//   const schema = z.object({
//     firstName: z.string().email({ message: "Please enter a valid email" }),
//     lastName: z
//       .string()
//       .min(5, { message: "Password should be atleast 5 characters long" }),
//     phoneNumber: z
//       .number()
//       .min(10, { message: "Number should only contain 10 digits" }),
//   });

//   type FormData = z.infer<typeof schema>;

  // const {
  //   register,
  //   handleSubmit,
  //   // formState: { errors, isValid },
  // } = useForm<FormData>({
  //   resolver: zodResolver(schema),
  // });

  const navigate = useNavigate();

  return (
    <>
      <AuthContainer center={'sm:items-center'}>
        <form
          className=""
          // onSubmit={handleSubmit(() => {
          //   // if (isValid) {
          //   //   mutate(data);
          //   // }
          //   // const { firstName, lastName, phoneNumber } = data;
          //   // navigate("organizationinfo");
          //   console.log("dire");

          //   // console.log(data);
          // })}
          onSubmit={() => {
            navigate("/organizationinfo");
          }}
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
          <div className="space-y-8 sm:h-[440px] overflow-y-scroll">
            <div className="">
              <HeaderTwo>First Name</HeaderTwo>
              <input
                // {...register("firstName")}
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="Temidire"
              />
            </div>

            <div className="mb-2">
              <HeaderTwo>Last Name</HeaderTwo>
              <input
                // {...register("lastName")}
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="Owoeye"
              />
            </div>

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
