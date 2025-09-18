import { Nullable } from "@/shared/types/common";
import { useState } from "react";

export function useRequestState<T>() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Nullable<T>>(null);
  const [error, setError] = useState(null);

  return {
    loading,
    data,
    error,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(true),
    setData,
    setError,
  };
}