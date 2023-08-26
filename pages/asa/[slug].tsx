import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import SideContainer from "../../Components/AsaComponent/SideContainer";
import Tx from "../../Components/Table/Charts";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useRouter } from "next/router";
import Seo from "../../Components/Seo";
import axios from "axios";
import useSWR from "swr";
import { fetchAPI } from "../../utils/fetchAPI";
const CandlestickChart = dynamic(
  () => import("../../Components/CandleStick/"),
  {
    ssr: false,
  }
);
const fetcher = async (url: string) =>
  await axios
    .get(url, {
      method: "GET",
      headers: {
        "X-Custom-TOKEN": `${process.env.asset_info}`,
      },
    })
    .then(async (res) => await res.data);

const Assets_Page = ({ asas, pairs }) => {
  const router = useRouter();
  const [currentPool, setCurrentPool] = useState(
    router.asPath.includes("pool") != true
      ? asas[0] && asas[0].pool_id
      : router.asPath.split("?pool=")[1]
  );
  const asaInfo =
    asas && asas.length == 3 ? asas[2] : asas.length == 2 && asas[1];
  const [ping, PingPong] = useState([]);
  const { data, error } = useSWR(
    () =>
      router.asPath.includes("pool") == true
        ? `https://api.algotrade.net/asa-info/${currentPool}`
        : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
  const lgg = useBreakpointValue({ lg: "960px" });
  return (
    <>
      <Seo seo={asas} />
      <Box className={styles.container}>
        <Box
          width="100%"
          display="flex"
          pt="30px"
          flexDirection={{ base: "column", llg: "row" }}
          justifyContent="space-between"
        >
          <Box
            width={{
              base: "100%",
              llg: "calc(100% - 280px - 10px - 10px - 28px)",
            }}
            // position="relative"
          >
            <CandlestickChart
              key={router.asPath}
              ping={ping}
              height={527}
              pairs={pairs}
              newAsa={data}
              poolName={asas}
              currentPool={currentPool}
            />
          </Box>
          <SideContainer
            key={router.asPath}
            poolName={asas}
            asaInfo={asaInfo}
            pairs={pairs}
            newAsa={data}
            setCurrentPool={setCurrentPool}
          />
        </Box>

        <Tx //@ts-ignore
          pairs={pairs}
          key={router.asPath}
          PingPong={PingPong}
          pid={asas}
        />
        {/* {!lgg && (
          <SideContainer
            key={router.asPath}
            poolName={asas}
            asaInfo={asaInfo}
          />
        )} */}
      </Box>
    </>
  );
};

export const getStaticPaths = async () => {
  const asa = await fetchAPI("asset", `${process.env.ASA}`);
  return {
    paths: asa.map((asa_id: any) => ({
      params: {
        slug: `${asa_id.asset_1_id}`,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  let asas = null;
  let pairs = null;
  try {
    const [asass, pairss] = await Promise.all([
      fetchAPI(`asa-pools/${params.slug}`, `${process.env.ASA_POOL}`),
      fetchAPI(`asa-pairs/${params.slug}`, `${process.env.ASA_PAIRS}`),
    ]);
    asas = asass;
    pairs = pairss;
  } catch (e) {
    return {
      notFound: true,
    };

    // return {
    //   redirect: {
    //     source: "/:slug*",
    //     destination: "/asa/404",
    //   },
    // };
  }
  return {
    props: {
      asas,
      pairs,
    },
    revalidate: 60,
  };
};

export default Assets_Page;
