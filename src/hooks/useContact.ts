import { useMutation, useQuery } from "@tanstack/react-query";
import { success } from "./useAuthData";
import { notify } from "./useAuthData";
import { useUserAuth } from "../stores/user";
import contactService from "../services/contact-service";
import axios from "axios";

interface Contact {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  maturity?: string;
  createdBy?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
}

interface Error {
  response: {
    data: {
      stack: string;
    };
  };
}

interface ContactPros {
  onClose: () => void;
}
interface Action {
  action: string;
  checked: boolean;
}

interface Comment {
  note: string;
  recordedBy: string;
}

interface Label {
  label: string;
  labelType: string;
}

interface Comment {
  memberId: string;
  commentId: string;
  contactId: string;
  churchId: string;
}

interface Note {
  note: string;
  noteId: string;
  recordedBy: string;
}

interface Notes {
  date: string;
  recordedBy: {
    _id: string;
    first_name: string;
    last_name: string;
    churchId: {
      _id: string;
      name: string;
      id: string;
    };
    age: null;
    fullname: string;
    id: string;
  };
  note: string;
  _id: string;
}

interface ContactStatus {
  status?: string;
  membershipStatus?: string;
  modifiedBy?: string;
}

interface AssignedTo {
  first_name: string;
  last_name: string;
}

interface LabelT {
  label: string;
  label_type: string;
}

interface Contacts {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  maturity: string;
  createdBy: string;
  createdAt: string;
  ModifiedDate: string;
  membershipStatus: string;
  status: string;
  _id: string;
  assignedTo: AssignedTo[];
  labels: LabelT[];
  Notes: Notes[];
  email: string;
  actions: Action[];
  church: {
    _id: string;
    name: string;
    id: string;
  };
  dateOfBirth: string;
  gender: string;
}

const queryParams = new URLSearchParams(location.search);

const contactId = queryParams.get("id");

export const useAddContact = ({ onClose }: ContactPros) => {
  const { user } = useUserAuth();
  const { refetch } = useGetAllContacts();

  return useMutation({
    mutationFn: (contact: Contact) =>
      contactService(user?.churchId?._id, "", "").post(contact),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Contact has been created successfully");
      refetch();
      onClose();
    },
    onError: (err: Error) => {
      if (err.response.data.stack.includes("duplicate")) {
        notify("Contact already exists");
      } else {
        notify("Fill in all compulsory fields");
        console.log(err);
      }
    },
  });
};

export const useAddActionItem = (onClose: () => void) => {
  const { user } = useUserAuth();
  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (contact: Action) =>
      contactService(user?.churchId?._id, contactId, "/action").post(contact),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Action has been added successfully");
      refetch();
      onClose();
    },
    onError: () => {
      notify("Couldn't add action at this moment");
    },
  });
};

export const useAddContactComment = (emptyComment: () => void) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (comment: any) =>
      contactService<Comment>(user?.churchId?._id, contactId, "/notes").patch(
        comment
      ),
    onSuccess: () => {
      success("Comment has been added successfully");
      refetch();
      emptyComment();
    },
    onError: () => notify("Couldn't add comment at this time"),
  });
};

export const useAddLabel = (onClose: () => void) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (labels: Label) =>
      contactService(user?.churchId?._id, contactId, "/label").patch(labels),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Label has been added successfully");
      refetch();
      onClose();
    },
    onError: () => {
      notify("Couldn't add label at this moment");
    },
  });
};

export const useAssignMember = (onClose: () => void) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (memberId: string) =>
      contactService(
        user?.churchId?._id,
        contactId,
        `/assign?aid=${memberId}`
      ).patch({}),
    onSuccess: () => {
      success("Member has been assigned successfully");
      refetch();
      onClose();
    },
    onError: () => notify("Member couldn't be assigned at this moment"),
  });
};

export const useDeleteContact = () => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (contactId: string) =>
      contactService(user?.churchId?._id, contactId).delete(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Contact has been deleted successfully");
      refetch();
    },
    onError: () => {
      notify("Couldn't delete contact at this moment");
    },
  });
};

export const useDeleteContactComment = () => {
  const { refetch } = useGetContacts();
  return useMutation({
    mutationFn: (comment: any) =>
      contactService(
        comment.churchId,
        comment.contactId,
        `/notes/${comment.commentId}?mid=${comment.memberId}`
      ).delete(),
    onSuccess: () => {
      refetch();
      success("Deleted Successfully");
    },
    onError: () => notify("Couldn't delete note at this time"),
  });
};

export const useDeleteLabel = () => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (label_name: string) =>
      contactService(
        user?.churchId?._id,
        contactId,
        `/label?label=${label_name}`
      ).delete(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Label has been deleted successfully");
      refetch();
    },
    onError: () => {
      notify("Couldn't delete label at this moment");
    },
  });
};

export const useUpdateActionItem = () => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();
  return useMutation({
    mutationFn: (action: { checked: boolean; _id: string }) =>
      contactService(
        user?.churchId?._id,
        contactId,
        `/action?action=${action._id}&checked=${action.checked}`
      ).patch({}),
    onSuccess: () => {
      refetch();
    },
    // onError: () => notify("Couldn't update note at this time"),
  });
};

export const useUpdateContact = ({ onClose }: { onClose?: () => void }) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (contact: Contact) =>
      contactService(user?.churchId?._id, contactId).patch(contact),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Contact has been updated successfully");
      refetch();
      onClose && onClose();
    },
    onError: () => {
      notify("Couldn't update contact at this moment");
    },
  });
};

export const useUpdateContactComment = () => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();
  return useMutation({
    mutationFn: (note: Note) =>
      contactService<Note>(
        user?.churchId?._id,
        contactId,
        `/notes/${note.noteId}`
      ).patch({ note: note.note, recordedBy: note.recordedBy }),
    onSuccess: () => {
      success("Note has been updated successfully");
      refetch();
    },
    onError: () => notify("Couldn't update note at this time"),
  });
};

export const useUpdateContactStatus = (props: {
  id: string | undefined;
  onClose: () => void;
}) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (contact: ContactStatus) =>
      contactService(user?.churchId?._id, props.id, "/status").patch(contact),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Contact has been updated successfully");
      props.onClose();
      refetch();
    },
    onError: () => {
      notify("Couldn't update contact at this moment");
    },
  });
};

export const useGetAllContacts = () => {
  const { user } = useUserAuth();

  return useQuery<Contacts[]>({
    queryKey: ["churches", user?.churchId?._id, "contacts"],
    queryFn: () =>
      axios
        .get(
          `https://turningways.onrender.com/api/v1/churches/${user?.churchId._id}/contact/`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .then((res) => res.data)
        .then((res) => res.contacts)
        .catch((err) => console.log(err)),
  });
};

export const useGetContacts = () => {
  const { user } = useUserAuth();
  return useQuery<any>({
    queryKey: ["churches", user?.churchId?._id, "contacts", contactId],
    queryFn: () =>
      axios
        .get(
          `https://turningways.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .then((res) => res.data)
        .then((res) => res.contact)
        .catch((err) => console.log(err)),
  });
};
