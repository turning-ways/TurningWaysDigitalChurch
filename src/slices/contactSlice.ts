import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { Contacts, Note } from "../types/contact";
import { RootState } from "../store";
import { notify, success } from "../hooks/useAuthData";

// Async thunk to fetch contacts with caching
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (churchId: string, { signal, rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/contacts/${churchId}`, {
        signal,
      });
      return response.data.data.contacts;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchContact = createAsyncThunk(
  "contacts/fetchContact",
  async (
    { churchId, contactId }: { churchId: string; contactId: string },
    { signal, rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `/api/v1/contacts/${churchId}/contact/${contactId}`,
        {
          signal,
        }
      );
      return response.data.data.contact;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface TurningWaysError {
  response: {
    data: {
      message: string;
    };
  };
}

// Async thunk to create contact
export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (
    {
      churchId,
      contact,
      onClose,
    }: {
      churchId: string;
      contact: {
        firstName: string;
        lastName: string;
        email: string;
        gender: string;
        phone: string;
        address: string;
        maturityLevel: string;
        createdBy: string;
        // Add the onClose property
      };
      onClose: () => void;
    },
    { signal, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/v1/contacts/${churchId}`,
        contact,
        { signal }
      );
      onClose();
      return response.data.data.contact;
    } catch (error) {
      console.log((error as TurningWaysError).response.data.message);
      return rejectWithValue((error as TurningWaysError).response.data.message);
    }
  }
);

// Async thunk to update contact
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (
    {
      churchId,
      contactId,
      contact,
    }: {
      churchId: string;
      contactId: string;
      contact: {
        firstName: string;
        lastName: string;
        gender: string;
        address: string;
        email: string;
        maturityLevel: string;
        contactType: string;
        phone: string;
        dateOfBirth: string;
        modifiedBy: string;
      };
    },
    { signal, rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `/api/v1/contacts/${churchId}/contact/${contactId}`,
        contact,
        {
          signal,
        }
      );
      return response.data.data.contact;
    } catch (error) {
      return rejectWithValue((error as TurningWaysError).response.data.message);
    }
  }
);

// Async thunk to delete contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (
    { churchId, contactId }: { churchId: string; contactId: string },
    { signal, rejectWithValue }
  ) => {
    try {
      await axios.delete(`/api/v1/contacts/${churchId}/contact/${contactId}`, {
        signal,
      });
      return contactId;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateContactStatus = createAsyncThunk(
  "contacts/updateContactStatus",
  async (
    {
      churchId,
      contactId,
      status,
    }: { churchId: string; contactId: string; status: string },
    { signal, rejectWithValue }
  ) => {
    try {
      const user: Authuser = JSON.parse(localStorage.getItem("user") as string);
      const response = await axios.post(
        `/api/v1/contacts/${churchId}/contact/${contactId}/status`,
        { status, modifieBy: user.memberId },
        {
          signal,
        }
      );
      return response.data.data.contactStatus;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addLabelToContact = createAsyncThunk(
  "contacts/addLabelToContact",
  async (
    {
      churchId,
      contactId,
      label,
      color,
    }: { churchId: string; contactId: string; color: string; label: string },
    { signal, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/v1/contacts/${churchId}/contact/${contactId}/label/`,
        {
          label,
          color,
        },
        {
          signal,
        }
      );
      return response.data.data.labels;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeLabelFromContact = createAsyncThunk(
  "contacts/removeLabelFromContact",
  async (
    {
      churchId,
      contactId,
      labelId,
    }: { churchId: string; contactId: string; labelId: string },
    { signal, rejectWithValue }
  ) => {
    try {
      await axios.delete(
        `/api/v1/contacts/${churchId}/contact/${contactId}/label/${labelId}`,
        {
          signal,
        }
      );
      return labelId;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addActionToContact = createAsyncThunk(
  "contacts/addActionToContact",
  async (
    {
      churchId,
      contactId,
      action,
    }: { churchId: string; contactId: string; action: { name: string } },
    { signal, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/v1/contacts/${churchId}/contact/${contactId}/action`,
        action,
        {
          signal,
        }
      );
      return response.data.data.action;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateActionToContact = createAsyncThunk(
  "contacts/updateActionToContact",
  async (
    {
      churchId,
      contactId,
      actionId,
    }: { churchId: string; contactId: string; actionId: string },
    { signal, rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `/api/v1/contacts/${churchId}/contact/${contactId}/action/${actionId}`,
        {},
        {
          signal,
        }
      );
      return response.data.data.action;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeActionFromContact = createAsyncThunk(
  "contacts/removeActionFromContact",
  async (
    {
      churchId,
      contactId,
      actionId,
    }: { churchId: string; contactId: string; actionId: string },
    { signal, rejectWithValue }
  ) => {
    try {
      await axios.delete(
        `/api/v1/contacts/${churchId}/contact/${contactId}/action/${actionId}`,
        {
          signal,
        }
      );
      return actionId;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const assignMemberToContact = createAsyncThunk(
  "contacts/assignMemberToContact",
  async (
    {
      churchId,
      contactId,
      memberId,
    }: { churchId: string; contactId: string; memberId: string },
    { signal, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/v1/contacts/${churchId}/contact/${contactId}/assign/${memberId}`,
        {},
        {
          signal,
        }
      );
      return response.data.data.assignedTo;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeMemberFromContact = createAsyncThunk(
  "contacts/removeMemberFromContact",
  async (
    {
      churchId,
      contactId,
      memberId,
    }: { churchId: string; contactId: string; memberId: string },
    { signal, rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(
        `/api/v1/contacts/${churchId}/contact/${contactId}/assign/${memberId}`,
        {
          signal,
        }
      );
      return response.data.data.assignedTo;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addCommentToContact = createAsyncThunk(
  "contacts/addCommentToContact",
  async (
    {
      churchId,
      contactId,
      note,
    }: { churchId: string; contactId: string; note: string },
    { signal, rejectWithValue }
  ) => {
    const user: Authuser = JSON.parse(localStorage.getItem("user") as string);
    try {
      const response = await axios.post(
        `/api/v1/contacts/${churchId}/contact/${contactId}/notes`,
        {
          note: note,
          createdBy: user.memberId,
        },
        {
          signal,
        }
      );
      return response.data.data.note as Comment;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateCommentToContact = createAsyncThunk(
  "contacts/updateCommentToContact",
  async (
    {
      churchId,
      contactId,
      noteId,
      note,
    }: { churchId: string; contactId: string; noteId: string; note: string },
    { signal, rejectWithValue }
  ) => {
    try {
      const user: Authuser = JSON.parse(localStorage.getItem("user") as string);

      const response = await axios.patch(
        `/api/v1/contacts/${churchId}/contact/${contactId}/notes/${noteId}`,
        {
          note: note,
          modifiedBy: user.memberId,
        },
        {
          signal,
        }
      );
      return response.data.data.note as { note: Note; updatedAt: string };
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeCommentFromContact = createAsyncThunk(
  "contacts/removeCommentFromContact",
  async (
    {
      churchId,
      contactId,
      noteId,
    }: { churchId: string; contactId: string; noteId: string },
    { signal, rejectWithValue }
  ) => {
    try {
      await axios.delete(
        `/api/v1/contacts/${churchId}/contact/${contactId}/notes/${noteId}`,
        {
          signal,
        }
      );
      return noteId;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface Comment {
  notes: Note[];
  updatedAt: string;
}

interface Authuser {
  church: string;
  churchId: string;
  firstName: string;
  lastName: string;
  memberId: string;
  role: string;
}

interface ContactsState {
  contacts: Contacts[];
  selectedContact: Contacts | null;
  status: string;
  loading: boolean;
  statusLoading: boolean;
  labelLoading: boolean;
  assignedLoading: boolean;
  noteLoading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  selectedContact: null,
  status: "idle",
  loading: false,
  statusLoading: false,
  labelLoading: false,
  assignedLoading: false,
  noteLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    selectContact: (state, action: PayloadAction<Contacts>) => {
      state.selectedContact = action.payload;
    },
    clearSelectedContact: (state) => {
      state.selectedContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchContact.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.selectedContact = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.loading = false;
        state.status = "succeeded";
        success("Contact created successfully");
      })
      .addCase(createContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.status = "failed";
        console.log(action.payload);
        notify(action.payload as string);
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.selectedContact = action.payload;
        state.loading = false;
        state.status = "succeeded";
        success("Contact updated successfully");
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.status = "failed";
        notify(action.payload as string);
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
        state.loading = false;
        state.status = "succeeded";
        success("Contact deleted successfully");
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.status = "failed";
        notify("Failed to delete contact");
      })
      .addCase(updateContactStatus.pending, (state) => {
        state.statusLoading = true;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.selectedContact!.contactStatus = action.payload;
        state.statusLoading = false;
        success("Contact status updated successfully");
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.error = action.payload as string;
        state.statusLoading = false;
        notify("Failed to update contact status");
      })
      .addCase(addLabelToContact.pending, (state) => {
        state.labelLoading = true;
      })
      .addCase(addLabelToContact.fulfilled, (state, action) => {
        state.selectedContact!.labels = action.payload;
        state.labelLoading = false;
        success("Label added successfully");
      })
      .addCase(addLabelToContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.labelLoading = false;
        notify("Failed to add label");
      })
      .addCase(removeLabelFromContact.pending, (state) => {
        // state.labelLoading = true;
        state.status = "loading";
      })
      .addCase(removeLabelFromContact.fulfilled, (state, action) => {
        state.selectedContact!.labels = state.selectedContact!.labels.filter(
          (label) => label.id !== action.payload
        );
        success("Label removed successfully");
      })
      .addCase(removeLabelFromContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.labelLoading = false;
        notify("Failed to remove label");
      })
      .addCase(addActionToContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addActionToContact.fulfilled, (state, action) => {
        state.selectedContact!.action = action.payload;
        state.status = "succeeded";
        success("Action added successfully");
      })
      .addCase(addActionToContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        notify("Failed to add action");
      })
      .addCase(updateActionToContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateActionToContact.fulfilled, (state, action) => {
        state.selectedContact!.action = action.payload;
        state.status = "succeeded";
        success("Action updated successfully");
      })
      .addCase(updateActionToContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        notify("Failed to update action");
      })
      .addCase(removeActionFromContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeActionFromContact.fulfilled, (state, action) => {
        state.selectedContact!.action = state.selectedContact!.action.filter(
          (actionItem) => actionItem.id !== action.payload
        );
        state.status = "succeeded";
        success("Action removed successfully");
      })
      .addCase(removeActionFromContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        notify("Failed to remove action");
      })
      .addCase(assignMemberToContact.pending, (state) => {
        state.status = "loading";
        state.assignedLoading = true;
      })
      .addCase(assignMemberToContact.fulfilled, (state, action) => {
        state.selectedContact!.assignedTo = action.payload;
        state.status = "succeeded";
        state.assignedLoading = false;
        success("Member assigned successfully");
      })
      .addCase(assignMemberToContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        state.assignedLoading = false;
        notify("Failed to assign member");
      })
      .addCase(removeMemberFromContact.pending, (state) => {
        state.status = "loading";
        state.assignedLoading = true;
      })
      .addCase(removeMemberFromContact.fulfilled, (state, action) => {
        state.selectedContact!.assignedTo = action.payload;
        state.status = "succeeded";
        state.assignedLoading = false;
        success("Member removed successfully");
      })
      .addCase(removeMemberFromContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        state.assignedLoading = false;
        notify("Failed to remove member");
      })
      .addCase(addCommentToContact.pending, (state) => {
        state.status = "loading";
        state.noteLoading = true;
      })
      .addCase(addCommentToContact.fulfilled, (state, action) => {
        state.selectedContact!.notes = action.payload.notes;
        state.selectedContact!.updatedAt = action.payload.updatedAt;
        state.noteLoading = false;
        state.status = "succeeded";
        success("Comment added successfully");
      })
      .addCase(addCommentToContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        state.noteLoading = false;
        notify("Failed to add comment");
      })
      .addCase(updateCommentToContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCommentToContact.fulfilled, (state, action) => {
        state.selectedContact!.notes = state.selectedContact!.notes.map(
          (note) =>
            note.id === action.payload.note.id ? action.payload.note : note
        );
        state.selectedContact!.updatedAt = action.payload.updatedAt;
        state.status = "succeeded";
        success("Comment updated successfully");
      })
      .addCase(updateCommentToContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        notify("Failed to update comment");
      })
      .addCase(removeCommentFromContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCommentFromContact.fulfilled, (state, action) => {
        state.selectedContact!.notes = state.selectedContact!.notes.filter(
          (note) => note.id !== action.payload
        );
        state.status = "succeeded";
        success("Comment removed successfully");
      })
      .addCase(removeCommentFromContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
        notify("Failed to remove comment");
      });
  },
});

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectSelectedContact = (state: RootState) =>
  state.contacts.selectedContact;
export const selectContactsStatus = (state: RootState) => state.contacts.status;
export const selectContactsLoading = (state: RootState) =>
  state.contacts.loading;
export const selectContactsError = (state: RootState) => state.contacts.error;
export const selectStatusLoading = (state: RootState) =>
  state.contacts.statusLoading;
export const selectLabelLoading = (state: RootState) =>
  state.contacts.labelLoading;
export const selectAssignedLoading = (state: RootState) =>
  state.contacts.assignedLoading;
export const selectNoteLoading = (state: RootState) =>
  state.contacts.noteLoading;

export const { selectContact, clearSelectedContact } = contactSlice.actions;

export default contactSlice.reducer;
