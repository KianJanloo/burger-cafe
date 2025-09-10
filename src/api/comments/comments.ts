import fetchAPI from "@/lib/interceptor";
import { Comment } from "./type";

const getComments = async () => {
  const response = await fetchAPI("/comments", { method: "GET" });
  return response;
};

const getCommentById = async (id: string) => {
  const response = await fetchAPI(`/comments/${id}`, { method: "GET" });
  return response;
};

const createComment = async (comment: Comment) => {
  const response = await fetchAPI("/comments", {
    method: "POST",
    body: JSON.stringify(comment),
  });
  return response;
};

const updateComment = async (id: string, comment: Partial<Comment>) => {
  const response = await fetchAPI(`/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(comment),
  });
  return response;
};

const deleteComment = async (id: string) => {
  const response = await fetchAPI(`/comments/${id}`, {
    method: "DELETE",
  });
  return response;
};

export { 
  getComments, 
  getCommentById, 
  createComment, 
  updateComment, 
  deleteComment 
};
