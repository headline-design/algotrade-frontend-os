import Head from "next/head";
import { getAsaSeo } from "../../utils/utils";
/**
 * @param {{seo?: myObj}}
 */

const Seo = ({ seo }) => {
  return (
    <Head>
      {seo == undefined ? (
        <>
          <title>AlgoTrade | Where Trading Experience Matters</title>
          <meta
            name="description"
            content="AlgoTrade is a trading platform that provides live cryptocurrency prices, charts and the ability to buy/sell without having to switch tabs back and forth with your preferred AMM exchange on the Algorand blockchain."
          />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/favicons/favicon-96x96.png" />
          <meta property="og:url" content="https://algotrade.app/home" />
          <meta property="og:site_name" content="AlgoTrade" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@algotradeapp" />
          <meta name="twitter:creator" content="@algotradeapp" />
          <meta
            name="twitter:title"
            content="AlgoTrade is a trading platform that provides live cryptocurrency prices, charts and the ability to buy/sell without having to switch tabs back and forth with your preferred AMM exchange on the Algorand blockchain."
          />
          <meta
            name="twitter:description"
            content="AlgoTrade is a trading platform that provides live cryptocurrency prices, charts and the ability to buy/sell without having to switch tabs back and forth with your preferred AMM exchange on the Algorand blockchain."
          />
          <meta name="twitter:image" content="/favicons/favicon-96x96.png" />
        </>
      ) : (
        <>
          <title>
            {`${seo && seo[0] && seo[0].asset_1_name}/
            ${seo[0] && seo[0].asset_2_name}
            ${getAsaSeo(seo, "current_price")} | AlgoTrade`}
          </title>
          <meta
            name="description"
            content={`${
              seo && seo[0] && seo[0].asset_1_name
            } price today is Ⱥ${getAsaSeo(
              seo,
              "current_price"
            )} with a 24-hour trading volume of Ⱥ${getAsaSeo(seo, "volume")}. ${
              seo && seo[0] && seo[0].asset_1_name
            } has a circulating supply of ${
              seo[0] && seo[0].circulating_supply
            } and market cap of Ⱥ${getAsaSeo(seo, "market_cap")}.`}
          />
          <meta property="og:type" content="website" />
          {/* <meta
            name="description"
            content="AlgoTrade is a trading platform that provides live cryptocurrency prices, charts and the ability to buy/sell without having to switch tabs back and forth with your preferred AMM exchange on the Algorand blockchain."
          /> */}
          <meta
            property="og:image"
            content={`https://mainnet-asa.algotrade.net/assets/${
              seo && seo[0] && seo[0].asset_1_id
            }/icon.png`}
          />
          <meta
            property="og:url"
            content={`https://algotrade.app/asa/${
              seo && seo[0] && seo[0].asset_1_id
            }`}
          />
          <meta property="og:site_name" content="AlgoTrade" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@algotradeapp" />
          <meta name="twitter:creator" content="@algotradeapp" />
          <meta
            name="twitter:title"
            content={`${seo && seo[0] && seo[0].asset_1_name}/${
              seo[0] && seo[0].asset_2_name
            } ${getAsaSeo(seo, "current_price")} | AlgoTrade`}
          />
          <meta
            name="twitter:description"
            content={`${
              seo && seo[0] && seo[0].asset_1_name
            } price today is Ⱥ${getAsaSeo(
              seo,
              "current_price"
            )} with a 24-hour trading volume of Ⱥ${getAsaSeo(seo, "volume")}. ${
              seo && seo[0] && seo[0].asset_1_name
            } has a circulating supply of ${
              seo[0] && seo[0].circulating_supply
            } and market cap of Ⱥ${getAsaSeo(seo, "market_cap")}.`}
          />
          <meta
            name="twitter:image"
            content={`https://mainnet-asa.algotrade.net/assets/${
              seo && seo[0] && seo[0].asset_1_id
            }/icon.png`}
          />
        </>
      )}
    </Head>
  );
};

export default Seo;
