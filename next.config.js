module.exports = {
  experimental: {
    outputStandalone: true,
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true, layers: true };
    return config;
  },
  api: {
    queryParser: false,
  },
  env: {
    algod: process.env.ALGOKEY,
    latest: process.env.ALGO_LATEST,
    customKey: process.env.API_TOKEN,
    mosttraded: process.env.MOSTASA,
    volume: process.env.VOLUME,
    pool: process.env.POOL,
    live: process.env.LIVETX,
    candle: process.env.CANDLES,
    account: process.env.ACCOUNT,
    searchhhh: process.env.SEARCH,
    ffaa: process.env.FFF,
    asset_info: process.env.ASA_INFO,
    gtag_tracking_id: process.env.GA_TRACKING_ID
  },
  images: {
    domains: ["asa-list.tinyman.org", "localhost", "mainnet-asa.algotrade.net", "img.algotrade.net", "algotrade.app"],
  },
  reactStrictMode: true,
};