import fetchAPI from "@/lib/interceptor";
import { FAQ } from "./type";

const getFAQs = async () => {
  const response = await fetchAPI("/faq", { method: "GET" });
  return response;
};

const getFAQsAdmin = async () => {
  const response = await fetchAPI("/faq/admin", { method: "GET" });
  return response;
};

const getFAQById = async (id: string) => {
  const response = await fetchAPI(`/faq/${id}`, { method: "GET" });
  return response;
};

const createFAQ = async (faq: FAQ) => {
  const response = await fetchAPI("/faq", {
    method: "POST",
    body: JSON.stringify(faq),
  });
  return response;
};

const updateFAQ = async (id: string, faq: Partial<FAQ>) => {
  const response = await fetchAPI(`/faq/${id}`, {
    method: "PATCH",
    body: JSON.stringify(faq),
  });
  return response;
};

const deleteFAQ = async (id: string) => {
  const response = await fetchAPI(`/faq/${id}`, {
    method: "DELETE",
  });
  return response;
};

export { 
  getFAQs, 
  getFAQsAdmin, 
  getFAQById, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ 
};
