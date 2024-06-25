import Modal from "../../ui/Modal/Modal";
import useGetAllMembers from "../../hooks/Member/useGetAllMembers";
import { useAssignMember } from "../../hooks/useContact";
import { capitalizeFirstLetters } from "../../constants/constants";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const ShowAssignedTo = ({ onClose }: { onClose: () => void }) => {
  const allMembersQuery = useGetAllMembers({
    page: 1,
    pageSize: 100000,
  });
  const {contact_id} = useParams();

  const assignMemberQuery = useAssignMember(onClose, contact_id??"");

  return (
    <Modal onClose={onClose}>
      <div
        className={`w-[400px] bg-white px-6 py-6 border rounded-2xl flex flex-col space-y-4`}
      >
        {allMembersQuery.data ? (
          allMembersQuery.data.map((member, i) => (
            <ul className="text-[#555555] hover:text-[#A0D7AC]">
              <li
                key={i}
                className="cursor-pointer"
                onClick={() => assignMemberQuery.mutate(member._id)}
              >
                {capitalizeFirstLetters(member.first_name) +
                  " " +
                  capitalizeFirstLetters(member.last_name)}
              </li>
            </ul>
          ))
        ) : (
          <p>There are no members present</p>
        )}
        <button
          className="px-10 w-fit bg-[#F3F3F3] text-[#7A7A7A] self-center rounded-[14px] py-2 flex justify-center"
          onClick={onClose}
        >
          {!assignMemberQuery.isPending ? <p>Cancel</p> : <ThreeDots width={24} height={24} color="black"/>}
        </button>
      </div>
    </Modal>
  );
};

export default ShowAssignedTo;
