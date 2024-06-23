import React from "react";

interface DropDownMenuProps {
  onSelect: (selectedItem: string) => void;
  dropdownItems: string[];
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  onSelect,
  dropdownItems,
}) => {
  const handleItemClick = (item: string) => {
    onSelect(item);
  };

  return (
    <div className="w-full bg-[#ffffff] absolute z-50 rounded-lg border max-h-52 overflow-y-scroll">
      {dropdownItems.map((item) => (
        <p
          key={item}
          className="hover:bg-[#f2f2f2] p-3 overflow-hidden"
          onClick={() => handleItemClick(item)}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default DropDownMenu;
