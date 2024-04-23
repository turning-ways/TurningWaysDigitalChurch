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
const savedAccessPermission = localStorage.getItem("edit_access_permission");
const access_permission = savedAccessPermission ? JSON.parse(savedAccessPermission) : "";
//phone number
const savedMemberStatus = localStorage.getItem("edit_member_status");
const member_status = savedMemberStatus ? JSON.parse(savedMemberStatus) : "";
//home address
const savedWorkType = localStorage.getItem("edit_work_type");
const work_type = savedWorkType ? JSON.parse(savedWorkType) : "";

const savedServiceUnit = localStorage.getItem("edit_service_unit");
const service_unit = savedServiceUnit ? JSON.parse(savedServiceUnit) : "";

export const useEditChurchInformationSore = create<PersonalInfo>()(
  (set, get) => ({
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
        "edit_access_permission",
        JSON.stringify(get().access_permission)
      );
    },
    setMemberStatus: (member) => {
      {
        set(() => {
          return { member_status: member };
        });
      }
      localStorage.setItem(
        "edit_member_status",
        JSON.stringify(get().member_status)
      );
    },
    setWorkType: (work) => {
      {
        set(() => {
          return { work_type: work };
        });
      }
      localStorage.setItem(
        "edit_work_type",
        JSON.stringify(get().work_type)
      );
    },
    setServiceUnit: (service) => {
      {
        set(() => {
          return { service_unit: service };
        });
      }
      localStorage.setItem(
        "edit_service_unit",
        JSON.stringify(get().service_unit)
      );
    },
  })
);
