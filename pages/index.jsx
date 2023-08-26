import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import ChartLabel from "../Components/Charts/ChartLabel";
import HomeTable from "../Components/HomeTable/";
import CaptionCarousel from "../Components/Carousel/ChakraCarousel";
import { Box } from "@chakra-ui/react";
import HeadersComp from "../Components/Header/Header";
import Trending from "../Components/Featured/Trending";
import Seo from "../Components/Seo";
import HomeContainer from "../Components/Containers";
import HomeBox from "../Components/Containers/HomeBox";
import MainStatistics from "../Components/Featured/MainStatistics";
import { AlgoHourly } from "../Components/Charts/AlgoHourly";
import { fetchAPI } from "../utils/fetchAPI";
const AlgoApex = dynamic(() => import("../Components/Charts/AlgoChart"), {
  ssr: false,
});

const Home = ({ algoChart, statisticsData }) => {
  return (
    <Box>
      <Seo />
      <Box className={styles.container}>
        {/* <HeadersComp /> */}
        <Box pt="27px">
          <HomeContainer>
            <MainStatistics data={statisticsData} />
            {/* z */}
            {algoChart && (
              <HomeBox>
                <Box minH="300px">
                  <ChartLabel />
                  <AlgoApex data={AlgoHourly(algoChart)} />
                </Box>
              </HomeBox>
            )}
          </HomeContainer>
        </Box>

        <HomeContainer>
          <Trending />
        </HomeContainer>
        <HomeTable />
      </Box>
    </Box>
  );
};
export const getStaticProps = async () => {
  // const data = await fetchAPI(`home`, `${process.env.HOMETOKEN}`);

  const [algoChart, data] = await Promise.all([
    fetchAPI(`algorandforthewin`, `${process.env.ALGO}`),
    fetchAPI(`home`, `${process.env.HOMETOKEN}`),
  ]);
  return {
    props: {
      algoChart: algoChart,
      statisticsData: data.response,
    },
    revalidate: 60,
  };
};
export default Home;
