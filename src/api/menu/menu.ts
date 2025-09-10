import fetchAPI from "@/lib/interceptor";
import { Food } from "./type";

const getMenu = async () => {
  const response = await fetchAPI("/menu", { method: "GET" });
  return response;
};

const getMenuById = async (id: string) => {
  const response = await fetchAPI(`/menu/${id}`, { method: "GET" });
  return response;
};

const createMenu = async (menu: Food) => {
  const response = await fetchAPI("/menu", {
    method: "POST",
    body: JSON.stringify(menu),
  });
  return response;
};

const updateMenu = async (id: string, menu: Partial<Food>) => {
  const response = await fetchAPI(`/menu/${id}`, {
    method: "PATCH",
    body: JSON.stringify(menu),
  });
  return response;
};

const deleteMenu = async (id: string) => {
  const response = await fetchAPI(`/menu/${id}`, {
    method: "DELETE",
  });
  return response;
};

export { getMenu, getMenuById, createMenu, updateMenu, deleteMenu };
