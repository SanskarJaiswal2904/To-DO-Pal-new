import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTestRoute = async () => {
  try {
    const response = await axios.get(`${API_URL}/test`);
    return response.data; // Use this in your Vue components
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
