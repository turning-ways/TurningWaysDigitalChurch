import { create } from "zustand";

//USER ID
interface PersonalInfo {
  prefix: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  gender: string;
  dateOfBirth: string;
  anniversary: string;
  educational_level: string;
  employment_status: string;
  health_status: string;
  setPrefix: (prefix: string) => void;
  setFirstName: (first_name: string) => void;
  setMiddleName: (middle_name: string) => void;
  setLastName: (last_name: string) => void;
  setSuffix: (suffix: string) => void;
  setGender: (gender: string) => void;
  setDateOfBirth: (dob: string) => void;
  setAnniversary: (anniversary: string) => void;
  setEducationalLevel: (s: string) => void;
  setEmploymentStatus: (s: string) => void;
  setHealthStatus: (s: string) => void;
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
//dateOfBirth
const savedDateOfBirth = localStorage.getItem("dateOfBirth");
const dateOfBirth = savedDateOfBirth ? JSON.parse(savedDateOfBirth) : "";
//anniversary
const savedAnniversary = localStorage.getItem("anniversary");
const anniversary = savedAnniversary ? JSON.parse(savedAnniversary) : "";
//educational level
const savedEducationalLevel = localStorage.getItem("educational-level");
const educational_level = savedEducationalLevel ? JSON.parse(savedEducationalLevel) : "";
//employment status
const savedEmploymentStatus = localStorage.getItem("employment-status");
const employment_status = savedEmploymentStatus ? JSON.parse(savedEmploymentStatus) : "";
//health status
const savedHealthStatus = localStorage.getItem("health-status");
const health_status = savedHealthStatus ? JSON.parse(savedHealthStatus) : "";

export const usePersonalInformationStore = create<PersonalInfo>()(
  (set, get) => ({
    prefix,
    first_name,
    middle_name,
    last_name,
    suffix,
    gender,
    dateOfBirth,
    anniversary,
    educational_level,
    employment_status,
    health_status,
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
    setDateOfBirth: (dob) => {
      {
        set(() => {
          return { dateOfBirth: dob };
        });
      }
      localStorage.setItem("dateOfBirth", JSON.stringify(get().dateOfBirth));
    },
    setAnniversary: (anniversary) => {
      {
        set(() => {
          return { anniversary };
        });
      }
      localStorage.setItem("anniversary", JSON.stringify(get().anniversary));
    },
    setEducationalLevel: (educational_level) => {
      {
        set(() => {
          return { educational_level };
        });
      }
      localStorage.setItem("educational-level", JSON.stringify(get().educational_level));
    },
    setEmploymentStatus: (employment_status) => {
      {
        set(() => {
          return { employment_status };
        });
      }
      localStorage.setItem("employment-status", JSON.stringify(get().employment_status));
    },
    setHealthStatus: (health_status) => {
      {
        set(() => {
          return { health_status };
        });
      }
      localStorage.setItem("health-status", JSON.stringify(get().health_status));
    },
  })
);
