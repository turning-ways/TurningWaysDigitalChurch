import { ReactNode } from "react";
import Navbar from "../../ui/Navbar/Navbar";

interface OverviewContainerProps {
  children: ReactNode;
  active: string;
}

const OverviewContainer: React.FC<OverviewContainerProps> = ({
  children,
  active,
}) => {
  return (
    <div className="lg:flex relative lg:mx-auto">
      <Navbar active={active} />
      <div className=" p-5 pt-[58px] sm:p-10 sm:pt-20 md:pt-16 flex-grow font-azo h-screen overflow-y-scroll bg-[#FFFDFD] flex flex-col ">
        {children}
      </div>
    </div>
  );
};

export default OverviewContainer;
