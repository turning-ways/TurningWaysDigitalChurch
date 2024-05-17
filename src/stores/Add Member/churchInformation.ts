import { create } from "zustand";

//USER ID
interface PersonalInfo {
  access_permission: string;
  member_status: string;
  work_type: string;
  service_unit: string;
  setAccessPermission: (access: string) => void;
  setMemberStatus: (status: string) => void;
  setWorkType: (work: string) => void;
  setServiceUnit: (unit: string) => void;
}

//email
const savedAccessPermission = localStorage.getItem("access_permission");
const access_permission =
  savedAccessPermission && savedAccessPermission !== "undefined"
    ? JSON.parse(savedAccessPermission)
    : "";
//phone number
const savedMemberStatus = localStorage.getItem("member_status");
const member_status =
  savedMemberStatus && savedMemberStatus !== "undefined"
    ? JSON.parse(savedMemberStatus)
    : "";
//home address
const savedWorkType = localStorage.getItem("work_type");
const work_type =
  savedWorkType && savedWorkType !== "undefined"
    ? JSON.parse(savedWorkType)
    : "";

const savedServiceUnit = localStorage.getItem("service_unit");
const service_unit =
  savedServiceUnit && savedServiceUnit !== "undefined"
    ? JSON.parse(savedServiceUnit)
    : "";

export const useChurchInformationSore = create<PersonalInfo>()((set, get) => ({
  access_permission,
  member_status,
  work_type,
  service_unit,
  setAccessPermission: (access) => {
    {
      set(() => {
        return { access_permission: access };
      });
    }
    localStorage.setItem(
      "access_permission",
      JSON.stringify(get().access_permission)
    );
  },
  setMemberStatus: (member) => {
    {
      set(() => {
        return { member_status: member };
      });
    }
    localStorage.setItem("member_status", JSON.stringify(get().member_status));
  },
  setWorkType: (work) => {
    {
      set(() => {
        return { work_type: work };
      });
    }
    localStorage.setItem("work_type", JSON.stringify(get().work_type));
  },
  setServiceUnit: (service) => {
    {
      set(() => {
        return { service_unit: service };
      });
    }
    localStorage.setItem("service_unit", JSON.stringify(get().service_unit));
  },
}));
