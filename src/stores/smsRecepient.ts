/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

//USER ID
interface PersonalInfo {
  recepients: { [key: string]: any }[];
  addRecepients: (recepients: { [key: string]: any }[]) => void;
  removeAllRecepients: () => void;
  removeRecepientById: (id: string) => void;
}

//email
const savedRecepients = localStorage.getItem("recepients");
const recepients =
  savedRecepients && savedRecepients !== "undefined"
    ? JSON.parse(savedRecepients)
    : [];

export const useSmsRecepientStore = create<PersonalInfo>()((set, get) => ({
  recepients,
  addRecepients: (recepients) => {
    {
      set((state) => {
        const uniqueNewRecipients = recepients.filter((newRecipient) => {
          return !state.recepients.some(
            (recepient) => recepient.id === newRecipient.id
          );
        });
        return { recepients: [...state.recepients, ...uniqueNewRecipients] };
      });
    }
    localStorage.setItem("recepients", JSON.stringify(get().recepients));
  },
  removeAllRecepients: () => {
    {
      set(() => {
        return { recepients: [] };
      });
    }
    localStorage.setItem("recepients", JSON.stringify(get().recepients));
  },
  removeRecepientById: (id) => {
    set((state) => ({
      recepients: state.recepients.filter((recepient) => recepient.id !== id),
    }));
    localStorage.setItem("recepients", JSON.stringify(get().recepients));
  },
}));
