import fetchAPI from "@/lib/interceptor";
import { CafeDetails } from "./type";

const getCafeDetails = async () => {
  const response = await fetchAPI("/cafe-details", { method: "GET" });
  return response;
};

const getCafeDetailsById = async (id: string) => {
  const response = await fetchAPI(`/cafe-details/${id}`, { method: "GET" });
  return response;
};

const createCafeDetails = async (cafeDetails: CafeDetails) => {
  const response = await fetchAPI("/cafe-details", {
    method: "POST",
    body: JSON.stringify(cafeDetails),
  });
  return response;
};

const updateCafeDetails = async (id: string, cafeDetails: Partial<CafeDetails>) => {
  const response = await fetchAPI(`/cafe-details/${id}`, {
    method: "PATCH",
    body: JSON.stringify(cafeDetails),
  });
  return response;
};

const deleteCafeDetails = async (id: string) => {
  const response = await fetchAPI(`/cafe-details/${id}`, {
    method: "DELETE",
  });
  return response;
};

export { 
  getCafeDetails, 
  getCafeDetailsById, 
  createCafeDetails, 
  updateCafeDetails, 
  deleteCafeDetails 
};
