import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  IoIosAddCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { useUserAuth } from "../../stores/user";
import { useNavigate } from "react-router-dom";
import useGetAllMembers from "../../hooks/Member/useGetAllMembers";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  const { user } = useUserAuth();
  const first_name = user?.first_name;
  const last_name = user?.last_name;
  const navigate = useNavigate();

  const [value, setValue] = useState<string>("");

  const { data: members } = useGetAllMembers();

  const [showProfile, setShowProfile] = useState<boolean>(false);

  const [showFilteredMembers, setShowFilteredMembers] = useState(false);

  const filteredMembers = members?.filter(
    (member: { first_name: string; last_name: string }) =>
      member.first_name.toLowerCase().includes(value.toLowerCase()) ||
      member.last_name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="space-y-5 font-azo flex flex-col relative">
      <div className="flex items-center gap-x-2">
        {/* <img src="/assets/images/winnerschapellogo.svg" alt="church's logo" /> */}
        <div className="bg-yellow-400 px-2 py-1 rounded-full">W</div>
        <h1 className="tracking-widest">{user?.churchId.name.toUpperCase()}</h1>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-azoBold text-[#0F1D48] text-3xl">{text}</h2>
        <div className="flex space-x-5 items-center">
          <div className="rounded-2xl bg-[#F2F0F0] flex py-2 px-3 gap-x-3 items-center h-fit w-[470px] relative">
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
                      } ${
                        filteredMembers?.length - 1 === index && "rounded-b-xl"
                      }`}
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
          <IoIosAddCircleOutline
            style={{ fontSize: "45px", cursor: "pointer" }}
            onClick={() =>
              navigate("/admin/directory/add-member/personal-information")
            }
          />
          <IoMdNotificationsOutline style={{ fontSize: "45px" }} />
          <div className="flex space-x-2 items-center">
            <div
              className="border-black border w-10 h-10 rounded-full flex justify-center items-center cursor-pointer z-50"
              onClick={() => setShowProfile(!showProfile)}
            >
              {first_name && first_name?.charAt(0) + last_name?.charAt(0)}
            </div>
            <div>
              <p onClick={() => console.log(user)}>Admin</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`self-end bg-white  p-6 space-y-4 border border-black absolute top-[84px] z-50 rounded-2xl text-[#434343] ${
          showProfile ? "block" : "hidden"
        }`}
      >
        <div className="flex space-x-2 items-center">
          <div className="border-black border w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
            <p className="text-[#2A2A2A]">
              {first_name && first_name?.charAt(0) + last_name?.charAt(0)}
            </p>
          </div>
          <div>
            <p>Administrator</p>
            <p className="text-sm text-[#555555]">
              {first_name && first_name + " " + last_name}
            </p>
          </div>
        </div>
        <h1>Profile</h1>
        <h1>Settings</h1>
        <h1>Logout</h1>
      </div>
    </div>
  );
};

export default Header;
