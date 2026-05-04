import { useEffect, useState, useContext } from "react";
import useFavorites from "../hooks/useFavorites";
import propertiesApi from "../api/propertiesApi";
import type IProperty from "../interfaces/Iproperties";
import PropertyCard from "../components/properties/PropertyCard";
import PropertySkeleton from "../components/properties/PropertySkeleton";
import { FiHeart } from "react-icons/fi";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
    const { favorites, favoritesCount } = useFavorites();
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [allProperties, setAllProperties] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
        navigate("/login");
        return;
        }
        propertiesApi().then((data) => {
        setAllProperties(data);
        setLoading(false);
        });
    }, [isAuthenticated, navigate]);

    const favoriteProperties = allProperties.filter((p) =>
        favorites.includes(String(p.id))
    );

    if (loading && allProperties.length === 0) return <PropertySkeleton />;

    return (
        <main className="min-h-screen bg-[#f8f9ff]">
        {/* Hero */}
        <section className="bg-[#eef2ff] px-4 md:px-6 lg:px-8 py-16 text-center flex flex-col items-center gap-4">
            <FiHeart className="w-10 h-10 text-[#4f6ef7] stroke-[1.5]" />
            <h1 className="text-[42px] font-bold text-[#0B1C30] tracking-[-1px] leading-tight">
            My Favorites
            </h1>
            <p className="text-[#6B7280] text-[16px]">Your saved properties</p>
        </section>

        {/* Content */}
        <section className="px-4 md:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
            {loading ? (
            <PropertySkeleton />
            ) : (
            <>
                <p className="text-[14px] text-[#45464D] mb-8">
                {favoritesCount} propert{favoritesCount === 1 ? "y" : "ies"} saved
                </p>

                {favoriteProperties.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                    <FiHeart className="w-16 h-8 text-[#CBD5E1] stroke-1" />
                    <h2 className="text-[24px] font-semibold text-[#0B1C30]">
                    No favorites yet
                    </h2>
                    <p className="text-[#6B7280] text-[15px]">
                    Start exploring and save properties you love.
                    </p>
                    <button
                    onClick={() => navigate("/listings")}
                    className="mt-4 bg-[#131b2e] text-white text-[14px] font-medium px-8 py-3 rounded-xl hover:bg-[#1b2743] transition-colors cursor-pointer"
                    >
                    Browse Listings
                    </button>
                </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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