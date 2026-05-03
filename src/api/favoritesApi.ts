import axios from "axios";

interface Favorite {
  id: string;
  userId: string | number;
  propertyId: string | number;
}

export async function getUserFavorites(userId: string) {
  const response = await axios.get<Favorite[]>(
    `http://localhost:3001/favorites?userId=${userId}`
  );
  return response.data;
}
