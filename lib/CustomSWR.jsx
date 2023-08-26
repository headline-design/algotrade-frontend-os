import axios from "axios";
import useSWR from "swr";
import { useSWRFetcher, useSWRFetcherr } from "../utils/fetcher";
const fetcher = async (url) =>
  await axios
    .get(url, { headers: { "X-Algo-API-Token": process.env.algod } })
    .then((res) => res.data);

const fetcherr = async (url) => await axios.get(url).then((res) => res.data);

export const GetAlgo = (d) => {
  return useSWR(`https://api.algotrade.net/${d}`, fetcherr, {
    refreshInterval: 8800,
    revalidateOnFocus: true,
    revalidateIfStale: false,
  });
};

export const GetAddress = (address) => {
  return useSWR(
    address
      ? `https://indexer.algoexplorerapi.io/v2/accounts/${address}`
      : null,
    useSWRFetcher,
    {
      refreshInterval: 8800,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};


export const GetPool = (asaAddress) => {
  return useSWR(
    asaAddress &&
      `https://mainnet1-node.algotrade.net/v2/accounts/${asaAddress}`,
    fetcher,
    {
      refreshInterval: 8800,
      refreshWhenHidden: false,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};

export const GetTable = (page, sort_by, order, verified, liquidity) => {
  return useSWR(
    `https://api-test.algotrade.net/pool-assets?limit=10&offset=${page}&sort_by=${sort_by}&order=${order}&verified=${verified}&liquidity=${liquidity}`,
    // 'YNWPRvGFJC4ffAupgf7T65fRYAUz',
    fetcherr,
    {
      refreshInterval: 8800,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};

export const GetFavoriteAsas = (favouriteId) => {
  return useSWR(
    favouriteId
      ? `https://api-test.algotrade.net/favorite-assets?favorite=true&asset_id=${favouriteId}`
      : null,
    useSWRFetcher,
    {
      refreshInterval: 8800,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};

export const GetTxTable = (z, x, page, sort_by, order) => {
  return useSWR(
    [
      `https://api.algotrade.net/live-trades/${
        z && x
      }?limit=10&offset=${page}&sort_by=${sort_by}&order=${order}`,
      process.env.live,
    ],
    useSWRFetcher,
    {
      refreshInterval: page == 0 ? 8800 : false,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};

export const GetTxTableAcc = (z, x, page, sort_by, order, acc) => {
  return useSWR(
    [
      `https://api.algotrade.net/live-trades/${
        z && x
      }?limit=10&offset=${page}&sort_by=${sort_by}&order=${order}&address=${acc}`,
      process.env.live,
    ],
    useSWRFetcher,
    {
      refreshInterval: page == 0 ? 8800 : false,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};

export const GetAccountTx = (acc) => {
  return useSWR(
    [`https://api.algotrade.net/account?address=${acc}`, process.env.account],
    useSWRFetcher,
    {
      refreshInterval: 12600,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};

export const GetAccountAllTx = (acc, asset, offset, sort, order) => {
  return useSWR(
    [
      acc &&
        `https://api.algotrade.net/account?address=${acc}&asset=${asset}&limit=10&offset=${offset}&sort_by=${sort}&order=${order}`,
      process.env.account,
    ],
    // : null,
    // :`http://localhost:3000/api/account?address=${acc}&asset=${asset}&limit=10&offset=${offset}&sort_by=${sort}&order=${order}`,
    useSWRFetcher,
    {
      refreshInterval: 12600,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};

export const GetAccountPool = (acc) => {
  return useSWR(
    [
      acc && `https://api.algotrade.net/account?address=${acc}&pool=all`,
      process.env.account,
    ],
    // : null,
    // :`http://localhost:3000/api/account?address=${acc}&asset=${asset}&limit=10&offset=${offset}&sort_by=${sort}&order=${order}`,
    useSWRFetcher,
    {
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );
};
// function getKeyByValue(object, value) {
//   return Object.keys(object).find((key) => object[key]["key"] === value);
// }

// export const GetIndiPool = (data, ) => {
//   const pollAlgod = data["apps-local-state"][0]["key-value"];
//   const algoBalance = data.amount;
//   const minBalance = data["min-balance"];
//   const outStanding =
//     pollAlgod[getKeyByValue(pollAlgod, "bwAAAAAAAAAA")].value.uint;

//   const reserve_1 =
//     asset_1_decimals != 0
//       ? pollAlgod[getKeyByValue(pollAlgod, "czE=")].value.uint /
//         ReturnDecimals(asset_1_decimals)
//       : pollAlgod[getKeyByValue(pollAlgod, "czE=")].value.uint;
//   const reserve_2 =
//     asset_2_id == 0
//       ? (algoBalance - minBalance - outStanding) /
//         ReturnDecimals(asset_2_decimals)
//       : pollAlgod[getKeyByValue(pollAlgod, "czI=")].value.uint /
//         ReturnDecimals(asset_2_decimals);
//   const price = reserve_2 / reserve_1;
//   return { reserve_1: reserve_1, reserve_2: reserve_2, asaPrice: price };
// }
