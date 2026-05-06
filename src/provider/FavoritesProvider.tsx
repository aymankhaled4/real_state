import { useState, useEffect, useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";
import AuthContext from "../context/AuthContext";
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
} from "../api/favoritesApi";
import { toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

function FavoritesProvider({ children }: Props) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    let cancelled = false;

    getUserFavorites(user.id).then((data) => {
      if (!cancelled) {
        setFavorites(data.map((fav) => String(fav.propertyId)));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?.id]);

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const toggleFavorite = async (propertyId: string) => {
    if (!isAuthenticated || !user?.id) {
      toast.error("Please login to save favorites!");
      return;
    }
    if (favorites.includes(propertyId)) {
      await removeFavorite(user.id, propertyId);
      setFavorites((prev) => prev.filter((id) => id !== propertyId));
      toast.info("Removed from favorites");
    } else {
      await addFavorite(user.id, propertyId);
      setFavorites((prev) => [...prev, propertyId]);
      toast.success("Added to favorites!");
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        favoritesCount: favorites.length,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
