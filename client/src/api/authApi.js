
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${BASE_URL.replace(/\/+$/, "")}/api/auth`,
  headers: {
    Accept: "application/json",
  },
});

// Register
export const registerUser = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// Update profile details
export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const response = await API.put("/profile", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// Upload profile picture
export const uploadProfilePicture = async (imageFile) => {
  if (!(imageFile instanceof File)) {
    throw new Error(
      "The selected image file is missing. Please select it again."
    );
  }

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const formData = new FormData();
  formData.append("avatar", imageFile, imageFile.name);

  const response = await API.post("/profile/avatar", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default API;
