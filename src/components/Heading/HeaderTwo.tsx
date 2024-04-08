interface HeaderTwoProps {
  children: React.ReactNode[] | React.ReactNode;
}

const HeaderTwo: React.FC<HeaderTwoProps> = ({ children }) => {
  return (
    <p className="mb-2 text-[#718096] font-medium lg:text-[18px]">{children}</p>
  );
};

export default HeaderTwo;
