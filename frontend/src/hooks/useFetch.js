import { useEffect, useState } from "react";

/**
 * useFetch
 * @param {Function} fetchFunction - API function to call
 * @param {Array} deps - dependency array
 */
const useFetch = (fetchFunction, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchFunction();

        if (isMounted) {
          setData(response.data || response);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
};

export default useFetch;
