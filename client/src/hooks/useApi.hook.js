import { useState, useEffect } from "react";
import axios from "axios";
import { getHeader } from "./functions";

const useApi = () => {
  const [data, setData] = useState();
  const [url, setUrl] = useState();
  const [callType, setCallType] = useState();
  const [body, setBody] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const header = getHeader();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        let result = undefined;
        switch (callType) {
          case "get":
          case "delete":
            result = await axios[callType](url, header).then(res => {
              return res.data;
            });
            break;
          case "put":
          case "post":
            result = await axios[callType](url, body, header).then(res => {
              return res.data;
            });
            break;
        }
        setData(result);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url, body]);

  const doFetch = (callType, url, body = undefined) => {
    setData(undefined);
    setCallType(callType);
    setBody(body);
    setUrl(url);
  };

  return [{ data, isLoading, isError, errorMessage }, doFetch];
};

export default useApi;
