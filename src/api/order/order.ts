import fetchAPI from "@/lib/interceptor";
import { Order } from "./type";

const getOrders = async (params?: { status?: string; orderType?: string }) => {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append("status", params.status);
  if (params?.orderType) queryParams.append("orderType", params.orderType);

  const url = `/orders${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const response = await fetchAPI(url, { method: "GET" });
  return response;
};

const getOrderById = async (id: string) => {
  const response = await fetchAPI(`/orders/${id}`, { method: "GET" });
  return response;
};

const getOrderByOrderNumber = async (orderNumber: string) => {
  const response = await fetchAPI(`/orders/order-number/${orderNumber}`, {
    method: "GET",
  });
  return response;
};

const createOrder = async (order: Order) => {
  const response = await fetchAPI("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
  return response;
};

const updateOrder = async (id: string, order: Partial<Order>) => {
  const response = await fetchAPI(`/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(order),
  });
  return response;
};

const updateOrderStatus = async (id: string, status: string) => {
  const response = await fetchAPI(`/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return response;
};

const deleteOrder = async (id: string) => {
  const response = await fetchAPI(`/orders/${id}`, {
    method: "DELETE",
  });
  return response;
};

export {
  getOrders,
  getOrderById,
  getOrderByOrderNumber,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
};
