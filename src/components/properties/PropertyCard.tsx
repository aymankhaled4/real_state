import type IProperty from "../../interfaces/Iproperties";
import bed from "../../assets/beds.svg";
import bath from "../../assets/baths.svg";
import sq from "../../assets/sq.svg";
import { FiHeart } from "react-icons/fi";
import useFavorites from "../../hooks/useFavorites";

interface Props {
  property: IProperty;
}
export default function PropertyCard({ property }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(String(property.id));
  
  return (
    <div className="bg-white rounded-3xl">
      <div className="relative">
        <img
          className="rounded-t-3xl h-80 w-full object-cover"
          src={property.image}
          alt={property.title}
        />
        <button
          type="button"
          onClick={() => toggleFavorite(String(property.id))}
          className="w-10 h-10 bg-[#FFFFFFCC] rounded-full absolute top-4 right-4 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
        >
          <FiHeart
            className={`w-5 h-5 transition-colors ${
              favorited
                ? "fill-red-500 stroke-red-500"
                : "stroke-[#0B1C30] fill-none"
            }`}
          />
        </button>
      </div>
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[#0B1C30] font-semibold text-[18px] leading-7">
            {property.title}
          </h3>
          <p className="font-bold text-[#0B1C30] text-[16px] leading-7">
            ${property.price.toLocaleString()}
          </p>
        </div>
        <span className="text-[#45464D] text-[14px] leadng-[20px]">
          {property.city}
        </span>
      </div>
      <div className="flex items-center gap-6 px-8 pb-6 lg:pb-8">
        <div className="flex items-center gap-2">
          <img src={bed} alt="Bed" />
          <span className="text-[12px] text-[#45464D] font-medium leading-4">
            {property.bedrooms} Beds
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src={bath} alt="Bath" />
          <span className="text-[12px] text-[#45464D] font-medium leading-4">
            {property.bathrooms} Baths
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src={sq} alt="Square" />
          <span className="text-[12px] text-[#45464D] font-medium leading-4">
            {property.area} sq ft
          </span>
        </div>
      </div>
    </div>
  );
}
