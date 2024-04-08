const Footer = () => {
  const date: Date = new Date();
  const currentYear: number = date.getFullYear();
  return (
    <footer className="bg-white p-4 w-full max-w-[948px] mx-auto rounded-[14px] flex justify-between text-[#999999]">
      <div className="flex">
        <p>&copy;</p>
        <p className="ml-1">{currentYear}</p>
      </div>
      <div className="flex ">
        <p className="hover:text-black cursor-pointer">Return to Website</p>
        <p className="ml-[14px] hover:text-black cursor-pointer">Support</p>
      </div>
    </footer>
  );
};

export default Footer;
