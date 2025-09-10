import fetchAPI from "@/lib/interceptor";
import { FooterInfo } from "./type";

const getFooterInfo = async () => {
  const response = await fetchAPI("/footer", { method: "GET" });
  return response;
};

const getFooterInfoById = async (id: string) => {
  const response = await fetchAPI(`/footer/${id}`, { method: "GET" });
  return response;
};

const createFooterInfo = async (footerInfo: FooterInfo) => {
  const response = await fetchAPI("/footer", {
    method: "POST",
    body: JSON.stringify(footerInfo),
  });
  return response;
};

const updateFooterInfo = async (id: string, footerInfo: Partial<FooterInfo>) => {
  const response = await fetchAPI(`/footer/${id}`, {
    method: "PATCH",
    body: JSON.stringify(footerInfo),
  });
  return response;
};

const deleteFooterInfo = async (id: string) => {
  const response = await fetchAPI(`/footer/${id}`, {
    method: "DELETE",
  });
  return response;
};

export { 
  getFooterInfo, 
  getFooterInfoById, 
  createFooterInfo, 
  updateFooterInfo, 
  deleteFooterInfo 
};
