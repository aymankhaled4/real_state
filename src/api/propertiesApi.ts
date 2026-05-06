import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export default async function propertiesApi() {
  const response = await axios.get(`${API_BASE_URL}/properties`);
  return response.data;
}
