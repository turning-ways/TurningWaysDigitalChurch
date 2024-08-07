import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { Member } from "../types/member";
// import { createSelector } from "reselect";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { notify, success } from "../hooks/useAuthData";

interface Authuser {
  church: string;
  churchId: string;
  firstName: string;
  lastName: string;
  memberId: string;
  role: string;
}

// Async thunk to fetch member details
export const fetchMemberDetails = createAsyncThunk(
  "member/fetchMemberDetails",
  async (
    { churchId, memberId }: { churchId: string; memberId: string },
    { signal }
  ) => {
    const response = await axios.get(
      `/api/v1/members/${churchId}/member/${memberId}`,
      { signal }
    );
    return response.data.data.member;
  }
);

// Async thunk to update member details
export const updateMemberDetails = createAsyncThunk(
  "member/updateMemberDetails",
  async (
    {
      navigate,
      churchId,
      memberId,
      member,
    }: {
      navigate: ReturnType<typeof useNavigate>;
      churchId: string;
      memberId: string;
      member: Member;
    },
    { signal }
  ) => {
    const user: Authuser = JSON.parse(localStorage.getItem("user") as string);

    const response = await axios.patch(
      `/api/v1/members/${churchId}/member/${memberId}`,
      {
        firstName: member.profile.firstName,
        middleName: member.profile.middleName || "",
        lastName: member.profile.lastName || "",
        prefix: member.profile.prefix || "",
        suffix: member.profile.suffix || "",
        gender: member.profile.gender,
        dateOfBirth: member.profile.dateOfBirth || "",
        maritalStatus: member.profile.maritalStatus || "",
        homeAddress: member?.profile?.address?.homeAddress || "",
        workAddress: member?.profile?.address?.workAddress || "",
        mainPhone: member.profile.phone.mainPhone || "",
        email: member.profile.email || "",
        worker: member.profile.worker || "",
        workerStatus: true,
        healthStatus: member.profile.healthStatus || "",
        employmentStatus: member.profile.employmentStatus || "",
        educationalLevel: member.profile.educationalLevel || "",
        modifiedBy: user.memberId,
      },
      {
        signal,
      }
    );
    navigate(`/admin/directory/member/personal-information?id=${memberId}`);
    clearMemberDetails();
    return response.data.data.member;
  }
);

export const addMember = createAsyncThunk(
  "member/addMember",
  async (
    {
      churchId,
      member,
    }: {
      churchId: string;
      member: Member;
    },
    { signal }
  ) => {
    const user: Authuser = JSON.parse(localStorage.getItem("user") as string);

    const response = await axios.post(
      `/api/v1/members/${churchId}/`,
      {
        firstName: member.profile.firstName,
        churchId: churchId,
        role: "member",
        middleName: member.profile.middleName || "",
        lastName: member.profile.lastName || "",
        prefix: member.profile.prefix || "",
        suffix: member.profile.suffix || "",
        gender: member.profile.gender || "",
        dateOfBirth: member.profile.dateOfBirth || "",
        maritalStatus: member.profile.maritalStatus || "",
        homeAddress: member?.profile?.address?.homeAddress || "",
        workAddress: member?.profile?.address?.workAddress || "",
        phone: member.profile.phone.mainPhone || "",
        email: member.profile.email || "",
        worker: member.profile.worker || "",
        workerStatus: true,
        active: true,
        healthStatus: member.profile.healthStatus || "",
        employmentStatus: member.profile.employmentStatus || "",
        educationalLevel: member.profile.educationalLevel || "",
        createdBy: user.memberId,
        modifiedBy: user.memberId,
      },
      {
        signal,
      }
    );
    return response.data.data.member;
  }
);

export const getAllMembers = createAsyncThunk(
  "member/getAllMembers",
  async ({ churchId }: { churchId: string }, { signal }) => {
    const response = await axios.get(`/api/v1/churches/${churchId}/members`, {
      signal,
    });
    return response.data.data.members;
  }
);

const initialState = {
  members: [] as Member[],
  member: {} as Member,
  tempMember: {} as Member, // Temporary state to store multi-step form data
  status: "idle",
  memberAddStatus: "idle",
  memberUpdateStatus: "idle",
  memebrLoadingStatus: "idle",
  loading: false,
  error: null as string | null,
};

// Utility function to set nested fields
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = { [key: string]: any };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setNestedField(obj: AnyObject, path: string, value: any): void {
  if (typeof path !== "string" || path.trim() === "") {
    throw new Error("Path must be a non-empty string");
  }

  const keys = path.split(".");
  const lastKey = keys.pop();

  if (!lastKey) {
    throw new Error("Invalid path");
  }

  const lastObj = keys.reduce((acc, key) => {
    if (typeof acc[key] !== "object" || acc[key] === null) {
      acc[key] = {}; // Create a new object if the key does not exist or is not an object
    }
    return acc[key];
  }, obj);

  lastObj[lastKey] = value;
}

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    clearMemberDetails(state) {
      state.member = {} as Member;
      state.tempMember = {} as Member;
      state.status = "idle";
    },
    setMemberDetails(state, action: PayloadAction<Member>) {
      state.member = action.payload;
    },
    setTempMemberDetails(state, action: PayloadAction<Member>) {
      state.tempMember = action.payload;
    },
    updateTempMemberField(
      state,
      action: PayloadAction<{
        field: string | string;
        value: string | number | boolean;
      }>
    ) {
      const { field, value } = action.payload;
      // change all undefined values to empty string
      setNestedField(state.tempMember, field as string, value);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberDetails.pending, (state) => {
        state.memebrLoadingStatus = "loading";
      })
      .addCase(fetchMemberDetails.fulfilled, (state, action) => {
        state.memebrLoadingStatus = "succeeded";
        state.member = action.payload;
        state.tempMember = action.payload; // Initialize tempMember with fetched data
      })
      .addCase(fetchMemberDetails.rejected, (state, action) => {
        state.memebrLoadingStatus = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(updateMemberDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMemberDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.member = action.payload;
        console.log(action.payload);
      })
      .addCase(updateMemberDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
        console.log(action.error);
      })
      .addCase(addMember.pending, (state) => {
        state.memberAddStatus = "loading";
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.memberAddStatus = "succeeded";
        state.member = action.payload;
        success("Member added successfully");
      })
      .addCase(addMember.rejected, (state, action) => {
        state.memberAddStatus = "failed";
        state.error = action.error.message ?? null;
        notify("Failed to add member");
      })
      .addCase(getAllMembers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(getAllMembers.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message ?? null;
        notify("Failed to fetch members");
      });
  },
});

export const selectMemberState = (state: RootState) => state.members;
export const selectMembers = (state: RootState) => state.members.members;
export const selectMember = (state: RootState) => state.members.member;
export const selectTempMember = (state: RootState) => state.members.tempMember;
export const selectMemberStatus = (state: RootState) => state.members.status;
export const selectMemberLoading = (state: RootState) => state.members.loading;
export const selectMemberError = (state: RootState) => state.members.error;
export const selectMemberUpdateStatus = (state: RootState) =>
  state.members.status;
export const selectMemberAddStatus = (state: RootState) =>
  state.members.memberAddStatus;
export const selectLoading = (state: RootState) => state.members.loading;

export const {
  clearMemberDetails,
  setMemberDetails,
  setTempMemberDetails,
  updateTempMemberField,
} = memberSlice.actions;
export default memberSlice.reducer;
