import { useEffect, useState } from "react";
import useFavorites from "../hooks/useFavorites";
import propertiesApi from "../api/propertiesApi";
import type IProperty from "../interfaces/Iproperties";
import PropertyCard from "../components/properties/PropertyCard";
import PropertySkeleton from "../components/properties/PropertySkeleton";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites, favoritesCount } = useFavorites();
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertiesApi().then((data) => {
      setAllProperties(data);
      setLoading(false);
    });
  }, []);

  const favoriteProperties = allProperties.filter((p) =>
    favorites.includes(String(p.id)),
  );

  return (
    <main className="min-h-screen bg-page transition-colors">
      <section className="bg-[#eef2ff] dark:bg-surface/60 px-4 md:px-6 lg:px-8 py-16 text-center flex flex-col items-center gap-4 transition-colors">
        <FiHeart className="w-10 h-10 text-[#4f6ef7] stroke-[1.5]" />
        <h1 className="text-[42px] font-bold text-foreground tracking-[-1px] leading-tight">
          My Favorites
        </h1>
        <p className="text-muted-foreground text-[16px]">
          Your saved properties
        </p>
      </section>

      <section className="px-4 md:px-6 lg:px-8 py-12">
        {loading ? (
          <PropertySkeleton />
        ) : (
          <>
            <p className="text-[14px] text-muted-foreground mb-8">
              {favoritesCount} propert{favoritesCount === 1 ? "y" : "ies"} saved
            </p>

            {favoriteProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <FiHeart className="w-16 h-8 text-slate-300 dark:text-slate-600 stroke-1" />
                <h2 className="text-[24px] font-semibold text-foreground">
                  No favorites yet
                </h2>
                <p className="text-muted-foreground text-[15px]">
                  Start exploring and save properties you love.
                </p>
                <button
                  onClick={() => navigate("/listings")}
                  className="mt-4 bg-accent-hover text-white text-[14px] font-medium px-8 py-3 rounded-xl hover:opacity-90 transition-colors cursor-pointer">
                  Browse Listings
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 lg:mt-12">
                {favoriteProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
