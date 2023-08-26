import axios from "axios";
import useSWR from "swr";
import { useSWRFetcher } from "../../utils/fetcher";
const fetcher = async (url) =>
  await axios
    .get(url, { headers: { "X-Algo-API-Token": process.env.algod } })
    .then((res) => res.data);

export const GetAlgo = (d) => {
  return useSWR([`https://api.algotrade.net/${d}`], useSWRFetcher, {
    refreshInterval: 12600,
    revalidateOnFocus: true,
    revalidateIfStale: false,
  });
};

export const GetAddress = (address) => {
  return useSWR(
    address
      ? `https://indexer.algoexplorerapi.io/v2/accounts/${address}?include-all=true`
      : null,
    useSWRFetcher,
    {
      refreshInterval: 12600,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};

export const GetPool = (asaAddress) => {
  return useSWR(
    asaAddress &&
      `https://mainnet-node.algotrade.net/v2/accounts/${asaAddress}`,
    fetcher,
    {
      refreshInterval: 12600,
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
};

export const GetTable = (page, sort_by, order) => {
  return useSWR(
    `https://api.algotrade.net/pool-assets?limit=10&offset=${page}&sort_by=${sort_by}&order=${order}`,
    useSWRFetcher,
    {
      refreshInterval: 12600,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
};

export const GetTxTable = (z, x, page, sort_by, order) => {
  return useSWR(
    `https://api.algotrade.net/live-trades/${
      z && x
    }?limit=10&offset=${page}&sort_by=${sort_by}&order=${order}`,
    useSWRFetcher,
    {
      refreshInterval: page == 0 ? 12600 : false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
};

export const GetAccountTx = (acc) => {
  return useSWR(
    `http://localhost:3000/api/account?address=${acc}`,
    useSWRFetcher,
    {
      refreshInterval: page == 0 ? 12600 : false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
};
