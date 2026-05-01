import { useRef, useState } from "react";
import Hero from "../components/layout/Hero";
import Properties from "../components/layout/Properties";
import CTA from "../components/layout/CTA";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const PropertiesSection = useRef<HTMLDivElement>(null);

  const searchHandler = () => {
    setInputValue("");
    setSearch(inputValue);
    PropertiesSection.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <Hero
        inputValue={inputValue}
        setInputValue={setInputValue}
        searchHandler={searchHandler}
      />
      <Properties search={search} PropertiesSection={PropertiesSection} />
      <CTA />
    </main>
  );
}
