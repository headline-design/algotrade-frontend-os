import axios from "axios";

export const useSWRFetcher = (url, token) =>
  axios
    .get(
      url,
      token && {
        method: "GET",
        headers: {
          "X-Custom-TOKEN": `${token}`,
        },
      }
    )
    .then((res) => res.data);

export const useSWRFetcherr = (url, token) =>
axios
    .get(
    url,
    token && {
        method: "GET",
        headers: {
        Authorization: `${token}`,
        },
    }
    )
    .then((res) => res.data);
