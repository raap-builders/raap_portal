import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

const handleError = (error: any) => {
  console.error("API request error:", error);

  // Handle errors based on status codes or specific error messages (optional)

  // Example: Redirect to login for unauthorized errors
  if (error.response && error.response.status === 401) {
    window.location.href = "/login"; // Replace with your login route
  }

  throw error; // Re-throw the error for further handling
};

const getRequestHeaders = (withAuth?: boolean): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
  };
  if (withAuth !== undefined && withAuth) {
    // Check if withAuth is true and defined
    headers["Authorization"] = `Bearer ${Cookies.get("accessToken") || ""}`;
  }
  return headers;
};
export const fetchAPI = async <T>(options: FetchAPIOptions): Promise<T> => {
  try {
    const url = `${BASE_URL}/${options.route}`;
    const headers = getRequestHeaders(options.withAuth);

    const response = await axios.request<T>({
      url,
      method: options.method || "GET",
      headers,
      data: options.data,
      params: options.params,
    });

    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Re-throw for further handling (optional)
  }
};

interface FetchAPIOptions {
  route: string;
  method?: AxiosRequestConfig["method"]; // Allows optional method specification
  data?: any;
  withAuth?: boolean;
  params?: AxiosRequestConfig["params"]; // Allows optional params for GET requests
}
