import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

interface Favorite {
  id: string;
  userId: string | number;
  propertyId: string | number;
}

export async function getUserFavorites(userId: string) {
  const response = await axios.get<Favorite[]>(
    `${API_BASE_URL}/favorites?userId=${userId}`
  );
  return response.data;
}
