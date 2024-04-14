import { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState<string>("");

  const navList = [
    {
      source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
      title: "Dashboard",
    },
    {
      source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
      title: "Membership",
    },
    {
      source: "../../../public/assets/images/Navbar/FormsIcon.svg",
      title: "Forms",
    },
    {
      source: "../../../public/assets/images/Navbar/WorkflowIcon.svg",
      title: "Workflow",
    },
    {
      source: "../../../public/assets/images/Navbar/SettingsIcon.svg",
      title: "Settings",
    },
    {
      source: "../../../public/assets/images/Navbar/HelpIcon.svg",
      title: "Help",
    },
    {
      source: "../../../public/assets/images/Navbar/LogoutIcon.svg",
      title: "Logout",
    },
  ];

  return (
    <nav
      className="px-5 pt-10 inline-flex flex-col items-center bg-DarkBlue text-[#99A0B7] text-[18px] h-screen font-azo font-medium
    "
    >
      <img
        src="../../../public/assets/images/Navbar/HeaderIcon.svg"
        alt="Logo"
        className=" w-5 h-5 mb-10"
      />
      <ul className="gap-y-4 flex flex-col">
        {navList.map((item) => (
          <li
            className={`flex gap-x-4 hover:bg-DarkBlueHover hover:text-white py-2 px-4 rounded-[10px] cursor-pointer ${
              active === item.title && "bg-DarkBlueHover text-white"
            }`}
            onClick={() => setActive(item.title)}
          >
            <img src={item.source} alt="" />

            <div>{item.title}</div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
