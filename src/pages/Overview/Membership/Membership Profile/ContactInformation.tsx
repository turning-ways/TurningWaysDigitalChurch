import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";

const ContactInformation = () => {
  // const { data } = useQuery({
  //   queryKey: ["church", churchId, "member", memberId],
  //   queryFn: () =>
  //     axios
  //       .get(`https://digital-church.onrender.com/api/v1/members/${memberId}`, {
  //         withCredentials: true,
  //       })
  //       .then((res) => res.data),
  // });

  const { data } = useGetMemberDetails();

  if (!data) {
    return <div>Loading...</div>;
  }

  // const information = [
  //   {
  //     name: "Email",
  //     value: data.member.email ?? "",
  //   },
  //   { name: "Phone Number", value: data.member.phone.MainPhone ?? "" },
  //   { name: "Address", value: data.member.address.HomeAddress ?? "" },
  // ];

  // useEffect(() => console.log(information), []);

  return (
    <div className="mt-10">
      {data && (
        <div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Email</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data?.member?.email}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Phone Number</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data?.member?.phone?.MainPhone}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Address</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data?.member?.address?.HomeAddress}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInformation;

// return (
//   <div>
//     <div className="mt-5">
//       {information.map((item) => (
//         <InformationInput text={item.name} subText={item.value} />
//       ))}
//     </div>
//     <p>dire</p>
//   </div>
// );
