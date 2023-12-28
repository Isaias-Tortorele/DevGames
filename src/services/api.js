import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  params: {
    key: apiKey,
  },
});

export default api;
