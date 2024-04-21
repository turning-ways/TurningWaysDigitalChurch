import { TiArrowSortedDown } from "react-icons/ti";
import DropDownMenu from "./DropDownMenu";
import { useState } from "react";

interface DropDownInputProps {
  text: string;
  items: string[];
  placeholder?: string;
  onSelect: (selectedItem: string) => void;
}

export const DropDownInput: React.FC<DropDownInputProps> = ({
  text,
  items,
  placeholder,
  onSelect,
}) => {
  const [value, setValue] = useState<string>("");
  const [showDropDownList, setShowDropDownList] = useState<boolean>(false);

  const handleSelectList = (selectedItem: string) => {
    setValue(selectedItem);
    setShowDropDownList(false);
    onSelect(selectedItem); 
  };

  return (
    <div className="relative space-y-1 mb-2">
      <p className="text-[#727272]">
        {text} <span className="text-[#61BD74]"> *</span>
      </p>
      <div className="border border-[#EBEFF9] bg-[#ffffff] rounded-lg w-full px-3 py-1 flex items-center">
        <input
          className="outline-none w-full h-auto bg-inherit"
          placeholder={placeholder}
          value={value}
          readOnly={true}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
        <TiArrowSortedDown
          className="cursor-pointer text-3xl"
          onClick={() => setShowDropDownList(!showDropDownList)}
        />
      </div>
      {showDropDownList && (
        <DropDownMenu onSelect={handleSelectList} dropdownItems={items} />
      )}
    </div>
  );
};
