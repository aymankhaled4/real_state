import { useParams, useNavigate } from "react-router-dom";
import { usePropertyById } from "../hooks/useProperties";
import PropertyDetail from "../components/properties/PropertyDetail";
import PropertyDetailSidebar from "../components/properties/PropertyDetailSidebar";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { property, loading } = usePropertyById(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading... Please wait.</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Property not found.</p>
      </div>
    );
  }

  return (
    <main className="px-4 md:px-6 lg:px-16 py-10 bg-surface min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground text-sm mb-6 hover:text-foreground transition-colors cursor-pointer"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <PropertyDetail property={property} />
        </div>
        <div className="w-full lg:w-[300px]">
          <PropertyDetailSidebar property={property} />
        </div>
      </div>
    </main>
  );
}