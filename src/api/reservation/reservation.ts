import fetchAPI from "@/lib/interceptor";
import { Reservation } from "./type";

const getReservations = async (params?: { date?: string }) => {
  const queryParams = new URLSearchParams();
  if (params?.date) queryParams.append("date", params.date);
  
  const url = `/reservation${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  const response = await fetchAPI(url, { method: "GET" });
  return response;
};

const getReservationById = async (id: string) => {
  const response = await fetchAPI(`/reservation/${id}`, { method: "GET" });
  return response;
};

const createReservation = async (reservation: Reservation) => {
  const response = await fetchAPI("/reservation", {
    method: "POST",
    body: JSON.stringify(reservation),
  });
  return response;
};

const updateReservation = async (id: string, reservation: Partial<Reservation>) => {
  const response = await fetchAPI(`/reservation/${id}`, {
    method: "PATCH",
    body: JSON.stringify(reservation),
  });
  return response;
};

const updateReservationStatus = async (id: string, status: string) => {
  const response = await fetchAPI(`/reservation/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return response;
};

const deleteReservation = async (id: string) => {
  const response = await fetchAPI(`/reservation/${id}`, {
    method: "DELETE",
  });
  return response;
};

export { 
  getReservations, 
  getReservationById, 
  createReservation, 
  updateReservation, 
  updateReservationStatus, 
  deleteReservation 
};
