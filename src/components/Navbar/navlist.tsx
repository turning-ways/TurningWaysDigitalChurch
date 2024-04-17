import { RxDashboard } from "react-icons/rx";
import { BsPeople } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa6";
import { GoWorkflow } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

export const navList = [
  {
    source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
    title: "Dashboard",
    icon: <RxDashboard className="text-3xl" />,
    route: "/overview/dashboard",
  },
  {
    source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
    title: "Membership",
    route: "/members",
    icon: <BsPeople className="text-3xl"/>,
  },
  {
    source: "../../../public/assets/images/Navbar/FormsIcon.svg",
    title: "Forms",
    route: "/overview/forms",
    icon: <FaWpforms className="text-3xl"/>,
  },
  {
    source: "../../../public/assets/images/Navbar/WorkflowIcon.svg",
    title: "Workflow",
    route: "/overview/workflow",
    icon: <GoWorkflow className="text-3xl"/>,
  },
  {
    source: "../../../public/assets/images/Navbar/SettingsIcon.svg",
    title: "Settings",
    route: "/overview/settings",
    icon: <IoSettingsOutline className="text-3xl"/>,
  },
  {
    source: "../../../public/assets/images/Navbar/HelpIcon.svg",
    title: "Help",
    route: "/overview/help",
    icon: <IoMdHelpCircleOutline className="text-3xl"/>,
  },
  {
    source: "../../../public/assets/images/Navbar/LogoutIcon.svg",
    title: "Logout",
    route: "/overview/logout",
    icon: <IoIosLogOut className="text-3xl"/>,
  },
];
