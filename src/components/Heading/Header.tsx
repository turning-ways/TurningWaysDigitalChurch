interface HeaderProps {
  children: React.ReactNode[] | React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="font-azo text-[28px] lg:text-[40px] ">{children}</div>
  );
};

export default Header;
