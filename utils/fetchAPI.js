import axios from "axios";

export function getURL(path) {
  return `${
    path.includes("asa-pairs") == true
      ? `https://api-test.algotrade.net/`
      : process.env.ALGOTRADE_API
  }${path}`;
}

export async function fetchAPI(path, apiKey) {
  const requestUrl = getURL(path);
  const { data } = await axios.get(`${requestUrl}`, {
    headers: {
      "X-Custom-TOKEN": `${apiKey}`,
    },
  });
  return data;
}
