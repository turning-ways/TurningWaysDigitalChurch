import React, { useEffect, useRef } from "react";

interface DropDownMenuProps {
  onSelect: (selectedItem: string) => void;
  dropdownItems?: string[];
  onClose?: () => void;
  itemsArray?: [];
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  onSelect,
  dropdownItems,
  onClose,
  ...props
}) => {
  const handleItemClick = (item: string) => {
    onSelect(item);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      onClose && onClose();
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
    <>
      {props.itemsArray && props.itemsArray.length > 0 ? (
        <div
          className="w-full bg-[#ffffff] absolute z-50 rounded-lg border max-h-52 overflow-y-scroll"
          ref={dropdownRef}>
          {props.itemsArray.map((item: { label: string; value: string }) => (
            <p
              key={item.label}
              className="hover:bg-[#f2f2f2] p-3 overflow-hidden"
              onClick={() => handleItemClick(item.value)}>
              {item.label}
            </p>
          ))}
        </div>
      ) : (
        <div
          className="w-full bg-[#ffffff] absolute z-50 rounded-lg border max-h-52 overflow-y-scroll"
          ref={dropdownRef}>
          {dropdownItems?.map((item) => (
            <p
              key={item}
              className="hover:bg-[#f2f2f2] p-3 overflow-hidden"
              onClick={() => handleItemClick(item)}>
              {item}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
