import { useMutation, useQuery } from "@tanstack/react-query";
import { success } from "./useAuthData";
import { notify } from "./useAuthData";
import { useUserAuth } from "../stores/user";
import contactService from "../services/contact-service";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  labelType: string;
}

interface Contacts {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  maturity: string;
  createdBy: string;
  createdAt: string;
  modifiedDate: string;
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
        notify("Phone number already exists");
      } else {
        notify("Fill in all compulsory fields");
        console.log(err);
      }
    },
  });
};

export const useAddActionItem = (onClose: () => void, contact_id: string) => {
  const { user } = useUserAuth();
  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (contact: Action) =>
      contactService(user?.churchId?._id, contact_id, "/action").post(contact),
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

export const useAddContactComment = (
  emptyComment: () => void,
  contact_id: string
) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (comment: any) =>
      contactService<Comment>(user?.churchId?._id, contact_id, "/notes").patch(
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

export const useAddLabel = (onClose: () => void, contact_id: string) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (labels: Label) =>
      contactService(user?.churchId?._id, contact_id, "/label").patch(labels),
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

export const useAssignMember = (onClose: () => void, contact_id: string) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (memberId: string) =>
      contactService(
        user?.churchId?._id,
        contact_id,
        `/assign?aid=${memberId}`
      ).patch({}),
    onSuccess: () => {
      success("Member has been assigned successfully");
      refetch();
      onClose();
    },
    onError: () => notify("Member has been assigned already"),
  });
};

export const useDeleteContact = (onClose: () => void) => {
  const { user } = useUserAuth();

  const { refetch } = useGetAllContacts();

  return useMutation({
    mutationFn: (contact_id: string) =>
      contactService(user?.churchId?._id, contact_id, "").delete(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Contact has been deleted successfully");
      refetch();
      onClose();
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

export const useDeleteLabel = (contact_id: string, reset: () => void) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (label_name: string) =>
      contactService(
        user?.churchId?._id,
        contact_id,
        `/label?label=${label_name}`
      ).delete(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Label has been deleted successfully");
      setTimeout(() => reset(), 1000);
      refetch();
    },
    onError: () => {
      notify("Couldn't delete label at this moment");
    },
  });
};

export const useUpdateActionItem = (contact_id: string) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();
  return useMutation({
    mutationFn: (action: { checked: boolean; _id: string }) =>
      contactService(
        user?.churchId?._id,
        contact_id,
        `/action?action=${action._id}&checked=${action.checked}`
      ).patch({}),
    onSuccess: () => {
      refetch();
    },
    // onError: () => notify("Couldn't update note at this time"),
  });
};

export const useUpdateContact = (
  onClose: () => void,
  contact_id: string | undefined
) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (contact: Contact) =>
      contactService(user?.churchId?._id, contact_id, "").patch(contact),
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

export const useUpdateContactComment = (contact_id: string) => {
  const { user } = useUserAuth();

  const { refetch } = useGetContacts();
  return useMutation({
    mutationFn: (note: Note) =>
      contactService<Note>(
        user?.churchId?._id,
        contact_id,
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
          `https://turningways.onrender.com/api/v1/churches/${user?.churchId._id}/contact`,
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

export const useGetContacts = (id?: string) => {
  const { user } = useUserAuth();
  const { contact_id } = useParams();
  return useQuery<any>({
    queryKey: ["churches", user?.churchId?._id, "contacts", contact_id],
    queryFn: () =>
      axios
        .get(
          `https://turningways.onrender.com/api/v1/churches/${
            user?.churchId._id
          }/contact/${contact_id ? contact_id : id}`,
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
