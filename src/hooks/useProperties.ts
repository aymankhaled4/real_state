import { useState, useEffect } from "react";
import type IProperty from "../interfaces/Iproperties";

export function usePropertyById(id: string | undefined) {
  const [property, setProperty] = useState<IProperty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperty = async () => {
      const res = await fetch("/db.json");
      const data = await res.json();
      const list: IProperty[] = Array.isArray(data) ? data : data.properties ?? data;
      const found = list.find((p) => String(p.id) === String(id));
      setProperty(found ?? null);
      setLoading(false);
    };
    getProperty();
  }, [id]);

  return { property, loading };
}