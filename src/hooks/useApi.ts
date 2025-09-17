import { AxiosError } from "axios";
import { useState } from "react";

export function useApi<T = unknown>(
  apiFunction: () => Promise<T>
): [
  {
    data: T | null;
    isFetching: boolean;
    error: string | null;
    isSuccess: boolean;
  },
  () => void
] {
  const [response, setResponse] = useState<{
    data: T | null;
    isFetching: boolean;
    error: string | null;
    isSuccess: boolean;
  }>({
    data: null,
    isFetching: false,
    error: null,
    isSuccess: false,
  });

  const fetchMethod = () => {
    setResponse({
      data: null,
      isFetching: true,
      error: null,
      isSuccess: false,
    });

    apiFunction()
      .then((res: T) => {
        setResponse({
          ...response,
          data: res,
          isFetching: false,
          isSuccess: true,
        });
      })
      .catch((err: AxiosError) => {
        setResponse({
          ...response,
          isFetching: false,
          error:
            (err.response?.data as { message: string } | null)?.message ||
            "Undefined",
        });
      });
  };

  return [response, fetchMethod];
}
