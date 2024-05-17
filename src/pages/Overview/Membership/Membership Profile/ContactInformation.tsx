import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";

const ContactInformation = () => {

  const { data } = useGetMemberDetails();


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
