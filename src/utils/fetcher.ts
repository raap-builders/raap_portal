import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const API_ENDPOINT = process.env.REACT_APP_BASE_URL;

const getUrl = (route: string): string => `${API_ENDPOINT}/${route}`;

const getRequestHeaders = (withAuth: boolean): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
  };
  if (withAuth) {
    headers["Authorization"] = Cookies.get("accessToken") || "";
  }
  return headers;
};

interface FetchOptions {
  route: string;
  method?: AxiosRequestConfig["method"];
  data?: any;
  withAuth?: boolean;
  params?: AxiosRequestConfig["params"];
}

export const fetchAPI = ({
  route,
  method = "GET",
  data = {},
  withAuth = false,
  params = null,
}: FetchOptions) => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: getUrl(route),
        method,
        headers: getRequestHeaders(withAuth),
        data,
        params,
      })
      .then((result) => {
        resolve(result.data ? result.data : result);
      })
      .catch((err) => {
        console.error("error in connecting to network", err);

        if (err.response && err.response.status === 401) {
          console.error(route, "401");
          window.location.pathname = "/login";
          reject(err);
        } else if (err.response && err.response.status === 400) {
          reject(err.response.data);
        } else {
          reject(err);
        }
      });
  });
};
