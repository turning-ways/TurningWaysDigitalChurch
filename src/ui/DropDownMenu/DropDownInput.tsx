import { TiArrowSortedDown } from "react-icons/ti";
import DropDownMenu from "./DropDownMenu";
import { useEffect, useRef, useState } from "react";

interface DropDownInputProps {
  text: string;
  items: string[];
  placeholder?: string;
  compulsory?: string;
  value?: string;
  onChange?: (e: string) => void;
  onSelect: (selectedItem: string) => void;
}

export const DropDownInput: React.FC<DropDownInputProps> = ({
  text,
  items,
  placeholder,
  compulsory,
  value,
  onChange,
  onSelect,
}) => {
  const [showDropDownList, setShowDropDownList] = useState<boolean>(false);

  const handleSelectList = (selectedItem: string) => {
    setShowDropDownList(false);
    onSelect(selectedItem);
    onChange && onChange(selectedItem);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropDownList(false);
    }
  };

  // Effect to set up event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={"relative space-y-1 mb-4"}>
      <p className="text-[#727272]">
        {text}{" "}
        <span className="text-[#61BD74]">{compulsory ? compulsory : ""}</span>
      </p>
      <div className="py-1" ref={dropdownRef}>
        <div
          className="border border-[#D9D9D9] rounded-lg w-full px-3 py-1 flex items-center"
          onClick={() => setShowDropDownList(!showDropDownList)}
        >
          <input
            className="outline-none w-full h-auto bg-transparent"
            placeholder={placeholder}
            value={value}
            readOnly={true}
          />
          <div className="border-l border-l-[#D9D9D9] h-10 mx-3" />
          <TiArrowSortedDown className="cursor-pointer text-3xl" />
        </div>
        {showDropDownList && (
          <DropDownMenu onSelect={handleSelectList} dropdownItems={items} />
        )}
      </div>
    </div>
  );
};
