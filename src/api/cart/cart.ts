import fetchAPI from "@/lib/interceptor";
import { CartItem, CartTotal } from "./type";

const getCartBySessionId = async (sessionId: string) => {
  const response = await fetchAPI(`/cart?sessionId=${sessionId}`, { method: "GET" });
  return response;
};

const getCartTotal = async (sessionId: string) => {
  const response = await fetchAPI(`/cart/total?sessionId=${sessionId}`, { method: "GET" });
  return response;
};

const getCartItemById = async (id: string) => {
  const response = await fetchAPI(`/cart/${id}`, { method: "GET" });
  return response;
};

const addItemToCart = async (cartItem: CartItem) => {
  const response = await fetchAPI("/cart", {
    method: "POST",
    body: JSON.stringify(cartItem),
  });
  return response;
};

const updateCartItem = async (id: string, cartItem: Partial<CartItem>) => {
  const response = await fetchAPI(`/cart/${id}`, {
    method: "PATCH",
    body: JSON.stringify(cartItem),
  });
  return response;
};

const updateCartItemQuantity = async (id: string, quantity: number) => {
  const response = await fetchAPI(`/cart/${id}/quantity`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
  return response;
};

const removeCartItem = async (id: string) => {
  const response = await fetchAPI(`/cart/${id}`, {
    method: "DELETE",
  });
  return response;
};

const clearCartSession = async (sessionId: string) => {
  const response = await fetchAPI(`/cart/session/${sessionId}`, {
    method: "DELETE",
  });
  return response;
};

export { 
  getCartBySessionId, 
  getCartTotal, 
  getCartItemById, 
  addItemToCart, 
  updateCartItem, 
  updateCartItemQuantity, 
  removeCartItem, 
  clearCartSession 
};
