import { useState, useEffect } from "react";

const useFetch = (url, method, body, isDataWrap) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  let config = {};
  if (method === "GET") {
    config = {
      method,
    };
  } else {
    config = {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
  }

  useEffect(() => {
    fetch(url, config)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data from this!");
        }
        return res.json();
      })
      .then((res) => {
        if (isDataWrap) {
          setData(res.data);
        } else {
          setData(res);
        }
        setIsFetching(false);
        setError(null);
      })
      .catch((err) => {
        setIsFetching(false);
        setError(err.message);
      });
  }, [url]);

  return { data, isFetching, error };
};

export default useFetch;
