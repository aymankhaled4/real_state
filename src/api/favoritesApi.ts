import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

interface Favorite {
  id: string;
  userId: string | number;
  propertyId: string | number;
}

export async function getUserFavorites(userId: string) {
  const response = await axios.get<Favorite[]>(`${API_BASE_URL}/favorites`);
  return response.data.filter((fav) => String(fav.userId) === String(userId));
}

export async function addFavorite(userId: string, propertyId: string) {
  const response = await axios.post<Favorite>(`${API_BASE_URL}/favorites`, {
    userId: String(userId),
    propertyId: String(propertyId)
  });
  return response.data;
}

export async function removeFavorite(userId: string, propertyId: string) {
  const response = await axios.get<Favorite[]>(`${API_BASE_URL}/favorites`);
  const favorite = response.data.find(
    (fav) =>
      String(fav.userId) === String(userId) &&
      String(fav.propertyId) === String(propertyId)
  );
  if (favorite) {
    await axios.delete(`${API_BASE_URL}/favorites/${favorite.id}`);
  }
}