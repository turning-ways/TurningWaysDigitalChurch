import { create } from "zustand";

//USER ID
interface PersonalInfo {
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  setContactEmail: (email: string) => void;
  setContactPhone: (phone: string) => void;
  setContactAddress: (address: string) => void;
}

//email
const savedContactEmail = localStorage.getItem("edit_contact_email");
const contact_email = savedContactEmail ? JSON.parse(savedContactEmail) : "";
//phone number
const savedContactPhone = localStorage.getItem("edit_contact_phone");
const contact_phone = savedContactPhone ? JSON.parse(savedContactPhone) : "";
//home address
const savedContactAddress = localStorage.getItem("edit_contact_address");
const contact_address = savedContactAddress ? JSON.parse(savedContactAddress) : "";

export const useEditContactInformationStore = create<PersonalInfo>()(
  (set, get) => ({
    contact_email,
    contact_phone,
    contact_address,
    setContactEmail: (email) => {
      {
        set(() => {
          return { contact_email: email };
        });
      }
      localStorage.setItem("edit_contact_email", JSON.stringify(get().contact_email));
    },
    setContactPhone: (phone) => {
      {
        set(() => {
          return { contact_phone: phone };
        });
      }
      localStorage.setItem("edit_contact_phone", JSON.stringify(get().contact_phone));
    },
    setContactAddress: (address) => {
      {
        set(() => {
          return { contact_address: address };
        });
      }
      localStorage.setItem("edit_contact_address", JSON.stringify(get().contact_address));
    },
  })
);
