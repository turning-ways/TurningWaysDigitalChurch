import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import useGetAllMembers from "../hooks/Member/useGetAllMembers";

interface SearchProps {
  size: string;
}

const Search: React.FC<SearchProps> = ({ size }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState<string>("");

  const { data: members } = useGetAllMembers({ page: 1, pageSize: 10000 });

  const [showFilteredMembers, setShowFilteredMembers] = useState(false);

  const filteredMembers = members?.filter(
    (member: { first_name: string; last_name: string }) =>
      member.first_name.toLowerCase().includes(value.toLowerCase()) ||
      member.last_name.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <div
      className={`rounded-2xl bg-[#F2F0F0] py-2 px-3 gap-x-3 items-center h-fit w-full lg:w-[300px] relative ${size}`}
    >
      <CiSearch style={{ fontSize: "29px", color: "#6D6C6C" }} />
      <input
        type="text"
        placeholder="Search for member"
        value={value}
        className="bg-transparent outline-none placeholder-[#6D6C6C] w-full"
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setShowFilteredMembers(true)}
        onBlur={() => setShowFilteredMembers(false)}
      />
      {showFilteredMembers && filteredMembers?.length !== 0 && (
        <ul className="absolute bg-white border border-black w-full top-14 left-0  rounded-xl z-50 max-h-52 overflow-y-scroll">
          {filteredMembers?.map(
            (
              member: {
                first_name: string;
                _id: string;
                last_name: string;
              },
              index: number
            ) => (
              <li
                key={index}
                className={`px-4 py-2 hover:bg-[#f2f2f2] cursor-pointer ${
                  index === 0 && "rounded-t-xl"
                } ${filteredMembers?.length - 1 === index && "rounded-b-xl"}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  navigate(
                    `/admin/directory/member/personal-information?id=${member._id}`
                  );
                  setShowFilteredMembers(false);
                }}
              >
                {member.first_name} {member.last_name}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
