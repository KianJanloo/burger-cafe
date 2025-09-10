import fetchAPI from "@/lib/interceptor";
import { ContactMessage } from "./type";

const getContactMessages = async (params?: { status?: string }) => {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append("status", params.status);
  
  const url = `/contact-us${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  const response = await fetchAPI(url, { method: "GET" });
  return response;
};

const getContactMessageById = async (id: string) => {
  const response = await fetchAPI(`/contact-us/${id}`, { method: "GET" });
  return response;
};

const createContactMessage = async (contactMessage: ContactMessage) => {
  const response = await fetchAPI("/contact-us", {
    method: "POST",
    body: JSON.stringify(contactMessage),
  });
  return response;
};

const updateContactMessage = async (id: string, contactMessage: Partial<ContactMessage>) => {
  const response = await fetchAPI(`/contact-us/${id}`, {
    method: "PATCH",
    body: JSON.stringify(contactMessage),
  });
  return response;
};

const updateContactMessageStatus = async (id: string, status: string) => {
  const response = await fetchAPI(`/contact-us/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return response;
};

const deleteContactMessage = async (id: string) => {
  const response = await fetchAPI(`/contact-us/${id}`, {
    method: "DELETE",
  });
  return response;
};

export { 
  getContactMessages, 
  getContactMessageById, 
  createContactMessage, 
  updateContactMessage, 
  updateContactMessageStatus, 
  deleteContactMessage 
};
