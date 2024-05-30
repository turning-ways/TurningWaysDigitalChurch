import { create } from "zustand";

//USER ID
interface Contact {
  contactId: string | null;
  setContactId: (id: string) => void;
}

//email
const savedContactId = localStorage.getItem("contact_id");
const contactId = savedContactId ? JSON.parse(savedContactId) : null

export const useContactIdStore = create<Contact>()((set, get) => ({
  contactId,
  setContactId: (id) => {
    {
      set(() => {
        return { contactId: id };
      });
    }
    localStorage.setItem("contact_id", JSON.stringify(get().contactId));
  },
}));
