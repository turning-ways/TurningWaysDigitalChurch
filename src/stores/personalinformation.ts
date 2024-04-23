import { create } from "zustand";

//USER ID
interface PersonalInfo {
  prefix: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  gender: string;
  setPrefix: (prefix: string) => void;
  setFirstName: (first_name: string) => void;
  setMiddleName: (middle_name: string) => void;
  setLastName: (last_name: string) => void;
  setSuffix: (suffix: string) => void;
  setGender: (gender: string) => void;
}

//prefix
const savedPrefix = localStorage.getItem("prefix");
const prefix = savedPrefix ? JSON.parse(savedPrefix) : "";
//first name
const savedFirstName = localStorage.getItem("first_name");
const first_name = savedFirstName ? JSON.parse(savedFirstName) : "";
//middle name
const savedMiddleName = localStorage.getItem("middle_name");
const middle_name = savedMiddleName ? JSON.parse(savedMiddleName) : "";
//last name
const savedLastName = localStorage.getItem("last_name");
const last_name = savedLastName ? JSON.parse(savedLastName) : "";
//suffix
const savedSuffix = localStorage.getItem("suffix");
const suffix = savedSuffix ? JSON.parse(savedSuffix) : "";
//gender
const savedGender = localStorage.getItem("gender");
const gender = savedGender ? JSON.parse(savedGender) : "";

export const usePersonalInformationStore = create<PersonalInfo>()(
  (set, get) => ({
    prefix,
    first_name,
    middle_name,
    last_name,
    suffix,
    gender,
    setPrefix: (prefix) => {
      {
        set(() => {
          return { prefix };
        });
      }
      localStorage.setItem("prefix", JSON.stringify(get().prefix));
    },
    setFirstName: (first_name) => {
      {
        set(() => {
          return { first_name };
        });
      }
      localStorage.setItem("first_name", JSON.stringify(get().first_name));
    },
    setMiddleName: (middle_name) => {
      {
        set(() => {
          return { middle_name };
        });
      }
      localStorage.setItem("middle_name", JSON.stringify(get().middle_name));
    },
    setLastName: (last_name) => {
      {
        set(() => {
          return { last_name };
        });
      }
      localStorage.setItem("last_name", JSON.stringify(get().last_name));
    },
    setSuffix: (suffix) => {
      {
        set(() => {
          return { suffix };
        });
      }
      localStorage.setItem("suffix", JSON.stringify(get().suffix));
    },
    setGender: (gender) => {
      {
        set(() => {
          return { gender: gender.toLowerCase() };
        });
      }
      localStorage.setItem("gender", JSON.stringify(get().gender));
    },
  })
);
