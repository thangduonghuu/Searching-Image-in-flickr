import axios from "axios";
import { ENDPOINTS } from "./constants";

export const axiosClient = axios.create({
  baseURL: ENDPOINTS,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
