import fetchAPI from "@/lib/interceptor";
import { GalleryCategory, GalleryItem } from "./type";

// Gallery Categories
const getGalleryCategories = async () => {
  const response = await fetchAPI("/gallery/categories", { method: "GET" });
  return response;
};

const getGalleryCategoryById = async (id: string) => {
  const response = await fetchAPI(`/gallery/categories/${id}`, { method: "GET" });
  return response;
};

const createGalleryCategory = async (category: GalleryCategory) => {
  const response = await fetchAPI("/gallery/categories", {
    method: "POST",
    body: JSON.stringify(category),
  });
  return response;
};

const updateGalleryCategory = async (id: string, category: Partial<GalleryCategory>) => {
  const response = await fetchAPI(`/gallery/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(category),
  });
  return response;
};

const deleteGalleryCategory = async (id: string) => {
  const response = await fetchAPI(`/gallery/categories/${id}`, {
    method: "DELETE",
  });
  return response;
};

// Gallery Items
const getGalleryItems = async () => {
  const response = await fetchAPI("/gallery/items", { method: "GET" });
  return response;
};

const getGalleryItemsByCategory = async (categoryId: string) => {
  const response = await fetchAPI(`/gallery/items/category/${categoryId}`, { method: "GET" });
  return response;
};

const getGalleryItemById = async (id: string) => {
  const response = await fetchAPI(`/gallery/items/${id}`, { method: "GET" });
  return response;
};

const createGalleryItem = async (item: GalleryItem) => {
  const response = await fetchAPI("/gallery/items", {
    method: "POST",
    body: JSON.stringify(item),
  });
  return response;
};

const updateGalleryItem = async (id: string, item: Partial<GalleryItem>) => {
  const response = await fetchAPI(`/gallery/items/${id}`, {
    method: "PATCH",
    body: JSON.stringify(item),
  });
  return response;
};

const deleteGalleryItem = async (id: string) => {
  const response = await fetchAPI(`/gallery/items/${id}`, {
    method: "DELETE",
  });
  return response;
};

export { 
  getGalleryCategories, 
  getGalleryCategoryById, 
  createGalleryCategory, 
  updateGalleryCategory, 
  deleteGalleryCategory,
  getGalleryItems, 
  getGalleryItemsByCategory, 
  getGalleryItemById, 
  createGalleryItem, 
  updateGalleryItem, 
  deleteGalleryItem 
};
