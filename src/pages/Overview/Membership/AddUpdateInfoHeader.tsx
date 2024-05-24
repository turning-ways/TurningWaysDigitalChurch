import React, { useEffect, useRef, useState } from "react";
import { FaChurch } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface InformationHeaderProps {
  route: {
    personalInfo: string;
    contactInfo: string;
    churchInfo: string;
  };
}

const AddUpdateInfoHeader: React.FC<InformationHeaderProps> = ({ route }) => {
  const [active, setActive] = useState<string>("");

  const navigate = useNavigate();

  const information = [
    {
      text: "Personal Information",
      textSm: "Personal Info",
      icon: <IoPersonSharp />,
      route: route.personalInfo,
      id: "PersonalInformation",
    },
    {
      text: "Contact Information",
      textSm: "Contact Info",
      icon: <MdContactPage />,
      route: route.contactInfo,
      id: "ContactInformation",
    },
    {
      text: "Church Information",
      textSm: "Church Info",
      icon: <FaChurch />,
      route: route.churchInfo,
      id: "ChurchInformation",
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

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = information.findIndex((item) => item.id === active);
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "end",
      });
    }
  }, [active]);
  return (
    <div className="w-full">
    <ul className="mt-10 flex text-[#8A8989] overflow-scroll w-full scrollbar-hide">
      {information.map((item, index) => (
        <li
          ref={(el) => (itemRefs.current[index] = el)}
          className={`px-6 border-b-4  flex items-center space-x-2 cursor-pointer whitespace-nowrap   ${
            active === item.id && "border-b-[#446DE3] text-[#446DE3]"
          }`}
          onClick={() => {
            navigate(item.route);
            setActive(item.id);
          }}
        >
          {item.icon}
          <p className="hidden md:block">{item.text}</p>
          <p className="md:hidden">{item.textSm}</p>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default AddUpdateInfoHeader;

// AddUpdateInfoHeader
