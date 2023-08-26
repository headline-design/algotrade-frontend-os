import App from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import axios from "axios";
import "../styles/Home.module.css";
import { createContext, useEffect, useState } from "react";
import theme from "../Components/Theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Script from "next/script";
import Layout from "../Components/Layout";
import FavIcon from "../Components/Seo/favicon";
import * as gtag from "../lib/gtag";
export const AssetsList = createContext({});
export const Default_Currency = createContext({});
export const AddressContext = createContext({});

const MyApp = ({ Component, pageProps }) => {

  const router = useRouter();
  const { asaList } = pageProps;
  const [defaultCurrency, setDefaultCurrency] = useState(
    typeof window !== "undefined" && localStorage.getItem("default_currency")
  );
  useEffect(() => {
    if (typeof window !== "undefined" && defaultCurrency == undefined) {
      localStorage.setItem("default_currency", "usd");
      setDefaultCurrency("usd");

    }
  }, [defaultCurrency]);
  const address =
    typeof window !== "undefined" &&
    localStorage.getItem("wallet") != null &&
    localStorage.getItem("wallet");
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <FavIcon />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.gtag_tracking_id}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.gtag_tracking_id}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <AddressContext.Provider value={address}>
        <AssetsList.Provider value={asaList}>
          <Default_Currency.Provider
            value={{
              setCurrency: setDefaultCurrency,
              defaultCurrency: defaultCurrency,
            }}
          >
            <ChakraProvider theme={theme}>
              <Layout key={router.asPath}>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </Default_Currency.Provider>
        </AssetsList.Provider>
      </AddressContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const { router } = ctx;
  if (router.route.includes("home") != true) {
    const { data: asaList } = await axios.get(
      process.env.ALGOTRADE_API != undefined
        ? `${process.env.ALGOTRADE_API}search`
        : `https://api.algotrade.net/search`,

      {
        headers: {
          "X-Custom-TOKEN": `${
            process.env.SEARCH != undefined
              ? process.env.SEARCH
              : process.env.searchhhh
          }`,
        },
      }
    );
    return {
      ...appProps,
      pageProps: { asaList: asaList },
    };
  }
  return {
    ...appProps,
  };
};
export default MyApp;
