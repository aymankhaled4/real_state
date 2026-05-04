import type IProperty from "../../interfaces/Iproperties";
import bed from "../../assets/beds.svg";
import bath from "../../assets/baths.svg";
import sq from "../../assets/sq.svg";
import fav from "../../assets/fav.svg";
import { useNavigate } from "react-router-dom";
interface Props {
  property: IProperty;
}

export default function PropertyCard({ property }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-3xl cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => navigate(`/properties/${property.id}`)}
    >
      <div className="relative">
        <img
          className="rounded-t-3xl h-48 sm:h-64 lg:h-80 w-full object-cover"
          src={property.image}
          alt={property.title}
        />
        <div
          className="w-10 h-10 bg-[#FFFFFFCC] rounded-full absolute top-4 right-4 flex items-center justify-center cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={fav} alt="Favorite" className="w-5 h-4.75" />
        </div>
      </div>
      <div className="p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="text-[#0B1C30] font-semibold text-[18px] leading-7">
            {property.title}
          </h3>
          <p className="font-bold text-[#0B1C30] text-[16px] leading-7 shrink-0">
            ${Number(property.price)}
          </p>
        </div>
        <span className="text-[#45464D] text-[14px] leading-[20px]">
          {property.city}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-6 px-6 sm:px-8 pb-6 lg:pb-8">
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