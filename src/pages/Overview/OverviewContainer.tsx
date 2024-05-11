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
    <div className="flex relative">
      <Navbar active={active} />
      <div className="p-10 flex-grow font-azo h-screen overflow-y-scroll bg-[#FFFDFD] flex flex-col ">
        {children}
      </div>
    </div>
  );
};

export default OverviewContainer;
