import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";
import { formatDate } from "./PersonalInformation";

const MembershipHistory = () => {
  // dateJoined, createdBy and updated at
  const { data } = useGetMemberDetails();
  return (
    <div className="mt-10">
      {data && (
        <div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Date Joined</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {formatDate(data?.member?.dateJoined)}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Created By</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data?.member?.createdBy}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Updated At</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {formatDate(data?.member?.updatedAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipHistory;
