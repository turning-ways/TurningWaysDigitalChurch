import { RxDashboard } from "react-icons/rx";
import { BsPeople } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa6";
import { GoWorkflow } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";

export   const navList = [
  {
    source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
    title: "Dashboard",
    icon: <RxDashboard className="text-2xl" />,
    route: `/admin/dashboard`,
  },
  {
    source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
    title: "Directory",
    route: `/admin/directory`,
    icon: <BsPeople className="text-2xl" />,
  },
  {
    source: "../../../public/assets/images/Navbar/WorkflowIcon.svg",
    title: "Contacts",
    route: "/admin/contacts",
    icon: <GoWorkflow className="text-2xl" />,
  },
  {
    source: "../../../public/assets/images/Navbar/FormsIcon.svg",
    title: "Forms",
    route: "/admin/forms",
    icon: <FaWpforms className="text-2xl" />,
  },
  {
    source: "../../../public/assets/images/Navbar/SettingsIcon.svg",
    title: "Settings",
    route: "/admin/setting/account",
    icon: <IoSettingsOutline className="text-2xl" />,
  },
  {
    source: "../../../public/assets/images/Navbar/HelpIcon.svg",
    title: "Help",
    route: "/admin/help",
    icon: <IoMdHelpCircleOutline className="text-2xl" />,
  },
];
