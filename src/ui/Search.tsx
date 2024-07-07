import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import useGetAllMembers from "../hooks/Member/useGetAllMembers";
import { useGetAllContacts } from "../hooks/useContact";

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

  const { data: contacts } = useGetAllContacts();
  const [showFilteredContacts, setShowFilteredContacts] = useState(false);
  const filteredContacts = contacts?.filter(
    (contact: { firstName: string; lastName: string }) =>
      contact.firstName.toLowerCase().includes(value.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(value.toLowerCase())
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowFilteredContacts(false);
      setShowFilteredMembers(false);
    }
  };

  // Effect to set up event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`rounded-lg bg-[#F2F0F0] py-2 px-3 gap-x-3 items-center h-fit w-full lg:w-[300px] relative ${size}`}
      ref={dropdownRef}
    >
      <CiSearch style={{ fontSize: "29px", color: "#6D6C6C" }} />
      <input
        type="text"
        placeholder="Search"
        value={value}
        className="bg-transparent outline-none placeholder-[#6D6C6C] w-full"
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => {
          setShowFilteredMembers(true);
          setShowFilteredContacts(true);
        }}
        // onBlur={() => {
        //   setShowFilteredMembers(false);
        // }}
      />
      <section
        className={`${
          showFilteredMembers && showFilteredContacts ? "block" : "hidden"
        } absolute top-14 left-0 w-full shadow-2xl bg-white rounded-md z-50  border border-gray-200 max-h-40 overflow-y-scroll `}
      >
        {showFilteredMembers && filteredMembers?.length !== 0 && (
          <ul>
            <div className="px-4 py-2 border-b font-azoBold text-sm">
              MEMBERS
            </div>
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
                  className={`px-4 py-2 hover:bg-[#f2f2f2] cursor-pointer `}
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
        {showFilteredContacts && filteredContacts?.length !== 0 && (
          <ul>
            <div className="px-4  border-y py-2 font-azoBold text-sm">
              CONTACTS
            </div>
            {filteredContacts?.map((contact, index: number) => (
              <li
                key={index}
                className={`px-4 py-2 hover:bg-[#f2f2f2] cursor-pointer ${
                  index === 0 && "rounded-t-0"
                } ${filteredContacts?.length - 1 === index && "rounded-b-md"}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/contacts/${contact._id}`);
                  // setShowFilteredContacts(false);
                }}
              >
                {contact.firstName} {contact.lastName}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Search;
