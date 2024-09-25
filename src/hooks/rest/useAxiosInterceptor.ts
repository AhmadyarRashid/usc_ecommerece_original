import { useEffect, useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { restInstance } from "../../constants/instance";
import { displayToast } from "../../constants/functions";

const useAxiosInterceptor = () => {
  const AUTH = `token`;
  const [restApiLoading, setRestApiLoading] = useState(false);

  useEffect(() => {
    const setLoading = (loading: boolean) => setRestApiLoading(loading);

    const requestIntercept = restInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        setLoading(true);
        config.headers = {
          ...config.headers,
          Authorization: config.headers?.Authorization || `Bearer ${AUTH}`,
          retryCall: config.headers?.retryCall || 1,
        };
        return config;
      },
      (error) => {
        setLoading(false);
        displayToast({
          type: "error",
          text1: "Request Error",
          text2: "There was an error sending the request.",
        });
        return Promise.reject(error);
      }
    );

    const responseIntercept = restInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        setLoading(false);

        // Handle success response globally (if needed)
        const { status, message } = response?.data?.result ?? {};
        if (status === 200) {          
          // displayToast({
          //   type: "success",
          //   text1: "Success",
          //   text2: message,
          // });
        }
        return response;
      },
      async (error) => {
        setLoading(false);

        const prevRequest = error.config;
        const errorMessage = error.response?.data?.result?.error || "Something went wrong";

        // Retry logic
        if (prevRequest?.headers?.retryCall === 1) {
          prevRequest.headers.retryCall = 2;
          return restInstance(prevRequest);
        }

        // Display error toast
        displayToast({
          type: "error",
          text1: "Error",
          text2: errorMessage,
        });

        return Promise.reject(error);
      }
    );

    return () => {
      restInstance.interceptors.request.eject(requestIntercept);
      restInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return { restInstance, restApiLoading };
};

export default useAxiosInterceptor;
