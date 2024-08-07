import { ReactNode, useEffect } from "react";
import Navbar from "../../ui/Navbar/Navbar";

interface OverviewContainerProps {
  children: ReactNode;
  active: string;
}

const OverviewContainer: React.FC<OverviewContainerProps> = ({
  children,
  active,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lg:flex relative lg:mx-auto">
      <Navbar active={active} />
      <main className="p-5 pt-[58px] sm:p-10 sm:pt-20 md:pt-16 flex-grow font-azo h-screen overflow-y-auto bg-[#FFFDFD] flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default OverviewContainer;
