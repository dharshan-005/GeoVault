import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        // Added this from chatgpt as I got the abort error after login.
        if (err.name === "AbortError") {
          console.log("Request aborted");
          return;
        }

        setIsError(err.message || "Something went wrong");
        setIsLoading(false);

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (ctrl) => ctrl !== httpAbortCtrl
        );

        throw err;
        // setIsError(err.message);
        // setIsLoading(false);
        // throw err;
      }
    },
    []
  );

  const clearError = () => {
    setIsError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, isError, sendRequest, clearError };
};
