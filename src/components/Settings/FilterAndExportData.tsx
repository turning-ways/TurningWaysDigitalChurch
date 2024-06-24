import { IoFilter } from "react-icons/io5";
import { FaRegMessage, FaChevronDown } from "react-icons/fa6";
import { CiExport } from "react-icons/ci";

const FilterAndExportData = () => {
  return (
    <section className="flex justify-between">
      <div className="flex items-center text-[#7F7E7E] space-x-2 ">
        <input type="checkbox" />
        <p>40 persons</p>
      </div>
      <ul className="flex space-x-6 text-[#AAA8A8]">
        {lists.map((item) => (
          <li className="flex items-center space-x-1">
            {item.icon}
            <p>{item.name}</p>
            {item?.iconTwo}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FilterAndExportData;

const lists = [
  {
    name: "Filter",
    icon: <IoFilter />,
  },
  {
    name: "Send Bulk Message",
    icon: <FaRegMessage />,
    iconTwo: <FaChevronDown />,
  },
  {
    name: "Export Data",
    icon: <CiExport />,
  },
];
