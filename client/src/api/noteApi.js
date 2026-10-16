import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAllNotes = async () => {
  const response = await API.get("/notes");
  return response.data;
};