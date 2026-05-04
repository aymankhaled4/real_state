import type IProperty from "../../interfaces/Iproperties";
import bed from "../../assets/beds.svg";
import bath from "../../assets/baths.svg";
import sq from "../../assets/sq.svg";

interface Props {
  property: IProperty;
}

export default function PropertyDetail({ property }: Props) {
  const features = ["Backyard", "Garage", "Updated Kitchen", "Fireplace", "Quiet Neighborhood"];

  return (
    <div>
      <div className="relative rounded-3xl overflow-hidden h-[240px] sm:h-[320px] md:h-[400px] lg:h-[460px] mb-6">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition">
          ‹
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition">
          ›
        </button>
      </div>

      <div className="flex items-start justify-between gap-3 mb-1">
        <h1 className="text-foreground font-bold text-xl sm:text-2xl lg:text-[26px] leading-8 flex-1">
          {property.title}
        </h1>
        <span className="bg-[#006C4A] text-white text-xs font-bold px-3 py-1 rounded-full mt-1 shrink-0">
          SALE
        </span>
      </div>

      <p className="text-muted-foreground text-sm mb-2 flex items-center gap-1">
        <span>📍</span> {property.city}
      </p>

      <p className="text-[#006C4A] font-bold text-xl sm:text-2xl mb-4">
        ${Number(property.price).toLocaleString()}
      </p>

      <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 text-muted-foreground text-sm">
        <span className="flex items-center gap-1">
          <img src={bed} alt="Bed" />
          {property.bedrooms} Bedrooms
        </span>
        <span className="flex items-center gap-1">
          <img src={bath} alt="Bath" />
          {property.bathrooms} Bathrooms
        </span>
        <span className="flex items-center gap-1">
          <img src={sq} alt="Area" />
          {property.area} sqft
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-foreground font-semibold text-base mb-1">Description</h2>
        <p className="text-muted-foreground text-sm leading-6">{property.description}</p>
      </div>

      <div>
        <h2 className="text-foreground font-semibold text-base mb-2">Features</h2>
        <div className="flex flex-wrap gap-2">
          {features.map((f) => (
            <span
              key={f}
              className="bg-surface-elevated border border-border text-muted-foreground text-xs px-3 py-1 rounded-full"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}