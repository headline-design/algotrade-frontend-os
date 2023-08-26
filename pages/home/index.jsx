import Seo from "../../Components/Seo";
import LandingStatistics from "../../Components/Landing/Statistics";
import HomeTable from "../../Components/Landing/HomeTable";
import HomeFeatures from "../../Components/Landing/HomeFeatures";
import HomeHero from "../../Components/Landing/Hero";
import { fetchAPI } from "../../utils/fetchAPI";

const Home = ({ poolStats }) => {
  return (
    <>
      <Seo />
      <HomeHero />
      <LandingStatistics stats={poolStats && poolStats} />
      <HomeTable />
      <HomeFeatures />
    </>
  );
};
export const getStaticProps = async () => {
  const data = await fetchAPI(`home`, `${process.env.HOMETOKEN}`);
  return {
    props: {
      poolStats: data,
    },
  };
};
export default Home;
