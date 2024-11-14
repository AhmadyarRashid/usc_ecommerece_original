import { useEffect, useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { restInstance } from "../../constants/instance";
import { displayToast } from "../../constants/functions";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../redux/slices/auth";
import { AppNavigationProps } from "../../constants/navigationTypes";

const useAxiosInterceptor = () => {
  const AUTH = `token`;
  const [restApiLoading, setRestApiLoading] = useState(false);
  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useDispatch();

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

        // Check for API-specific errors inside response data
        const { error, status } = response?.data?.result ?? {};

        if (error) {
          // Log a specific message if the token has expired
          if (error === "Auth token has expired!" && status === 400) {
            displayToast({
              type: "error",
              text1: "Error",
              text2:
                "Your session has been expired.",
            });

            dispatch(clearAuth());

            navigation.reset({
              index: 0,
              routes: [{ name: "Register" }],
            });

            return;
          }

          // Display error toast for any other API error
          displayToast({
            type: "error",
            text1: "Error",
            text2: error,
          });

          // Reject the promise to indicate an error in the response
          return Promise.reject(new Error(error));
        }

        // Successful response handling if no error in response data
        return response;
      },
      async (error) => {
        setLoading(false);

        const prevRequest = error.config;
        const errorMessage =
          error.response?.data?.result?.error || "Something went wrong";

        // Retry logic for specific error handling
        if (prevRequest?.headers?.retryCall === 1) {
          prevRequest.headers.retryCall = 2;
          return restInstance(prevRequest);
        }

        // Display generic error toast if the error originated in the interceptor
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
