import { FaChevronRight } from "react-icons/fa6";

const AccountSettings = () => {
  return (
    <section>
      <ul>
        {account.map((item, index) => (
          <li
            key={index}
            className="flex justify-between py-[13px] px-[14px] border-b text-[#555454] border-b-[#D4D4D4] cursor-pointer my-2 items-center"
          >
            <p className="text-[20px] ">{item.name}</p>
            <FaChevronRight />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AccountSettings;

const account = [
  {
    name: "Admin Profile",
  },
  {
    name: "General Settings",
  },
  {
    name: "Integrations",
  },
  {
    name: "Notifications",
  },
];
