import axios from "@/axios";

export const fetchContacts = async (churchId: string) => {
  try {
    const response = await axios.get(`/api/v1/contacts/${churchId}`);
    return response.data.data.contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};
