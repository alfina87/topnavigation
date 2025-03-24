import { useState } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (url: string, options: RequestInit = {}) => {
    setLoading(true);
    setData(null);
    setError("");

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setData(data);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
