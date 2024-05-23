import { SlArrowRight } from "react-icons/sl";

interface MemberTableProps {
  length: number;
  index: number;
  first_name: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth: string;
}

const MemberTable: React.FC<MemberTableProps> = ({
  length,
  index,
  first_name,
  phone,
  email,
  dateOfBirth,
  gender,
}) => {
  return (
    <>
      <div
        className={`sm:grid grid-cols-9 gap-4 border-r border-l border-t py-3 pl-2 hidden ${
          length - 1 === index && "border-b"
        }`}
      >
        <div className="col-span-2">{first_name}</div>
        <div className="col-span-1">{gender}</div>
        <div className="col-span-2 truncate">{phone}</div>
        <div className="col-span-3 xl:col-span-2 truncate">{email}</div>
        <div className="col-span-1 hidden xl:block">{dateOfBirth}</div>
        <div className="col-span-1">Single</div>
      </div>
      <div className="sm:hidden">
        <div className="border-b border-[#BDBDBD]  flex py-2 text-[#555454] px-3 justify-between items-center">
          <div>
            <p>{first_name}</p>
            <p>{phone}</p>
          </div>
          <SlArrowRight />
        </div>
      </div>
    </>
  );
};

export default MemberTable;
