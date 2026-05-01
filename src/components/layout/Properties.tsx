import React from "react";
import PropertyGrid from "../properties/PropertyGrid";

interface Props {
  search: string;
  PropertiesSection: React.RefObject<HTMLDivElement | null>;
}

export default function Properties({ search, PropertiesSection }: Props) {
  return (
    <section
      className="px-4 md:px-6 lg:px-8 py-24 bg-[#eff4ff]"
      ref={PropertiesSection}>
      <span className="text-[14px] font-bold text-[#006C4A] leading-6 tracking-[1.6px]">
        CURATED SELECTION
      </span>
      <h2 className="text-[36px] font-bold leading-10 tracking-[-0.9px] text-[#0B1C30] mt-2">
        Featured Residencies
      </h2>
      <PropertyGrid search={search} />
    </section>
  );
}
