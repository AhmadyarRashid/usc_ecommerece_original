import useAxiosInterceptor from "./useAxiosInterceptor";
import { AxiosRequestHeaders } from "axios";

interface ApiParams {
  method: string;
  url: string;
  data?: any;
  headers?: AxiosRequestHeaders;
}

const useApiHook = () => {
  const { restInstance, restApiLoading } = useAxiosInterceptor();

  const handleRestApi = async ({
    method = "GET",
    url,
    data = {},
    headers = {},
  }: ApiParams) => {
    const requestData = {
      jsonrpc: "2.0",
      params: data,
    };

    return await restInstance({
      method,
      url,
      data: requestData,
      headers,
    });
  };

  return { handleRestApi, restApiLoading };
};

export default useApiHook;
