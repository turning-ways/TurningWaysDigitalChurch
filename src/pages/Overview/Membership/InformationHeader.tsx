import React, { useEffect, useState } from "react";
import { FaChurch } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaClockRotateLeft } from "react-icons/fa6";

interface InformationHeaderProps {
  route: {
    personalInfo: string;
    contactInfo: string;
    churchInfo: string;
    membershipHistory: string;
  };
}

const InformationHeader: React.FC<InformationHeaderProps> = ({ route }) => {
  const [active, setActive] = useState<string>("");

  const navigate = useNavigate();

  const information = [
    {
      text: "Personal Information",
      icon: <IoPersonSharp />,
      route: route.personalInfo,
      id: "PersonalInformation",
    },
    {
      text: "Contact Information",
      icon: <MdContactPage />,
      route: route.contactInfo,
      id: "ContactInformation",
    },
    {
      text: "Church Information",
      icon: <FaChurch />,
      route: route.churchInfo,
      id: "ChurchInformation",
    },
    {
      text: "Membership History",
      icon: <FaClockRotateLeft />,
      route: route.membershipHistory,
      id: "MembershipHistory",
    },
  ];

  useEffect(() => {
    const regexPersonal = /personal-information/;
    if (regexPersonal.test(window.location.href)) {
      setActive("PersonalInformation");
    }
    const regexContact = /contact-information/;
    if (regexContact.test(window.location.href)) {
      setActive("ContactInformation");
    }
    const regexChurch = /church-information/;
    if (regexChurch.test(window.location.href)) {
      setActive("ChurchInformation");
    }
  }, [window.location.href]);
  return (
    <ul className="mt-10 flex text-[#8A8989]">
      {information.map((item) => (
        <li
          className={`px-6 border-b-4  flex items-center space-x-2 cursor-pointer ${
            active === item.id && "border-b-[#446DE3] text-[#446DE3]"
          }`}
          onClick={() => {
            navigate(item.route);
            setActive(item.id);
          }}
        >
          {item.icon}
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default InformationHeader;
