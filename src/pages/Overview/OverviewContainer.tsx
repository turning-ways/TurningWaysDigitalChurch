import { ReactNode } from "react";
import Navbar from "../../components/Navbar/Navbar";

interface OverviewContainerProps {
  children: ReactNode;
  active: string;
}

const OverviewContainer: React.FC<OverviewContainerProps> = ({
  children,
  active,
}) => {
  return (
    <div className="lg:flex relative max-w-[1440px] lg:mx-auto">
      <Navbar active={active} />
      <div className=" p-5 sm:p-10 flex-grow font-azo h-screen overflow-y-scroll bg-[#FFFDFD] flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default OverviewContainer;
