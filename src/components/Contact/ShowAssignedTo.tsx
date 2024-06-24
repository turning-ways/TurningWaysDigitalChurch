import Modal from "../../ui/Modal/Modal";
import useGetAllMembers from "../../hooks/Member/useGetAllMembers";
import { useAssignMember } from "../../hooks/useContact";
import { capitalizeFirstLetters } from "../../constants/constants";

const ShowAssignedTo = ({ onClose }: { onClose: () => void }) => {
  const allMembersQuery = useGetAllMembers({
    page: 1,
    pageSize: 100000,
  });
  const assignMemberQuery = useAssignMember(onClose);

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
          className="px-10 w-fit bg-[#F3F3F3] text-[#7A7A7A] self-center rounded-[14px] py-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ShowAssignedTo;
