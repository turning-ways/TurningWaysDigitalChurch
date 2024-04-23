import { IoIosArrowForward } from "react-icons/io";
// import { useQuery } from "@tanstack/react-query";
// import { useChurchIdStore } from "../../../../stores/churchId";
// import axios from "axios";

const PersonalInformation = () => {
  // const information = [
  //   {
  //     name: "First Name",
  //     value: "Temidire",
  //   },
  //   {
  //     name: "Last Name",
  //     value: "Owoeye",
  //   },
  //   {
  //     name: "Birthday",
  //     value: "Owoeye",
  //   },
  //   {
  //     name: "Country",
  //     value: "Owoeye",
  //   },
  //   {
  //     name: "Marital Status",
  //     value: "Owoeye",
  //   },
  // ];

  // const queryParams = new URLSearchParams(location.search);

  // const memberId = queryParams.get("id");

  // const { churchId } = useChurchIdStore();

  // const { data } = useQuery({
  //   queryKey: ["church", churchId, "member", memberId],
  //   queryFn: () =>
  //     axios
  //       .get(`https://digital-church.onrender.com/api/v1/members/${memberId}`, {
  //         withCredentials: true,
  //       })
  //       .then((res) => res.data),
  // });

  return (
    <div className="mt-10">
      {/* <button onClick={() => console.log(memberId, data)}>click</button> */}
      <div className="flex p-5 bg-[#F3F1F1] justify-between items-center ">
        <p className="font-medium text-[#414040]">Household</p>
        <IoIosArrowForward className="text-[28px]" />
      </div>
      
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">First Name</p>
          <p className="outline-none text-[#434343] text-lg w-full">{'Temidire'}</p>
        </div>
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">Last Name</p>
          <p className="outline-none text-[#434343] text-lg w-full">{}</p>
        </div>
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">Middle Name</p>
          <p className="outline-none text-[#434343] text-lg w-full">{}</p>
        </div>
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">Prefix</p>
          <p className="outline-none text-[#434343] text-lg w-full">{}</p>
        </div>
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">Suffix</p>
          <p className="outline-none text-[#434343] text-lg w-full">{}</p>
        </div>
      
    </div>
  );
};

export default PersonalInformation;
