import { createContext } from "react";

interface IFavoritesContext {
  favorites: string[];
  isFavorite: (propertyId: string) => boolean;
  toggleFavorite: (propertyId: string) => Promise<void>;
  favoritesCount: number;
}

const FavoritesContext = createContext<IFavoritesContext>(
  {} as IFavoritesContext,
);

export default FavoritesContext;
