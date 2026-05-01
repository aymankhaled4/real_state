import { useEffect, useState } from "react";
import propertiesApi from "../../api/propertiesApi";
import PropertyCard from "./PropertyCard";
import type IProperty from "../../interfaces/Iproperties";
import PropertySkeleton from "./PropertySkeleton";

export default function PropertyGrid({ search }: { search: string }) {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertiesApi().then((data) => {
      setProperties(data);
      setLoading(false);
    });
  }, []);

  const filteredProperties = properties.filter(
    (property) =>
      property.city.toLowerCase().includes(search.toLowerCase()) ||
      property.title.toLowerCase().includes(search.toLowerCase()),
  );
  const items = filteredProperties.length > 0 ? filteredProperties : properties;

  return loading ? (
    <PropertySkeleton />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 lg:mt-12">
      {items.map((property: IProperty) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
