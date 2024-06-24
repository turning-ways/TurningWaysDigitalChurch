import { IoIosAddCircle, IoIosClose } from "react-icons/io";
import Heading from "../../pages/Overview/Contacts/Heading";
import ShowLabels from "./ShowLabels";
import { useDeleteLabel, useGetContacts } from "../../hooks/useContact";
import { useState } from "react";
import Color from "color";

const Label = () => {
  const [showLabels, setShowLabels] = useState<boolean>(false);
  const deleteLabelQuery = useDeleteLabel();
  const contactDetailsQuery = useGetContacts();


  return (
    <section>
      <Heading text="Label" />
      <div className="flex space-x-3 items-center w-full">
        <IoIosAddCircle
          className="text-5xl text-[#444343] cursor-pointer"
          onClick={() => setShowLabels(!showLabels)}
        />
        <div className="overflow-x-scroll flex space-x-3 scrollbar-hide">
          {contactDetailsQuery.data &&
            contactDetailsQuery.data.labels &&
            contactDetailsQuery.data.labels.map((item: any) => (
              <div
                style={{
                  backgroundColor: getDarkerShade(item.label_type, -0.7),
                  borderColor: getDarkerShade(item.label_type, 0.3),
                }}
                className={`border border-[${item.label_type}] rounded-md text-[#141414] w-full flex items-center px-2 py-1 whitespace-nowrap`}
              >
                <p>{item.label}</p>
                <IoIosClose
                  className="text-3xl cursor-pointer"
                  onClick={() => deleteLabelQuery.mutate(item.label)}
                />
              </div>
            ))}
        </div>
        {showLabels && (<ShowLabels onClose={() => setShowLabels(!showLabels)} />)}
      </div>
    </section>
  );
};

export default Label;

const getDarkerShade = (color: string, amount: number = 0.2): string => {
    return Color(color).darken(amount).hex();
  };