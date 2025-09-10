import fetchAPI from "@/lib/interceptor";
import { Story, TeamMember } from "./type";

// Story Management
const getStory = async () => {
  const response = await fetchAPI("/about-us/story", { method: "GET" });
  return response;
};

const createStory = async (story: Story) => {
  const response = await fetchAPI("/about-us/story", {
    method: "POST",
    body: JSON.stringify(story),
  });
  return response;
};

const updateStory = async (id: string, story: Partial<Story>) => {
  const response = await fetchAPI(`/about-us/story/${id}`, {
    method: "PATCH",
    body: JSON.stringify(story),
  });
  return response;
};

const deleteStory = async (id: string) => {
  const response = await fetchAPI(`/about-us/story/${id}`, {
    method: "DELETE",
  });
  return response;
};

// Team Management
const getTeamMembers = async () => {
  const response = await fetchAPI("/about-us/team", { method: "GET" });
  return response;
};

const getTeamMemberById = async (id: string) => {
  const response = await fetchAPI(`/about-us/team/${id}`, { method: "GET" });
  return response;
};

const createTeamMember = async (teamMember: TeamMember) => {
  const response = await fetchAPI("/about-us/team", {
    method: "POST",
    body: JSON.stringify(teamMember),
  });
  return response;
};

const updateTeamMember = async (id: string, teamMember: Partial<TeamMember>) => {
  const response = await fetchAPI(`/about-us/team/${id}`, {
    method: "PATCH",
    body: JSON.stringify(teamMember),
  });
  return response;
};

const deleteTeamMember = async (id: string) => {
  const response = await fetchAPI(`/about-us/team/${id}`, {
    method: "DELETE",
  });
  return response;
};

export { 
  getStory, 
  createStory, 
  updateStory, 
  deleteStory,
  getTeamMembers, 
  getTeamMemberById, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
};
