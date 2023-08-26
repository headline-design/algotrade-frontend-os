import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import Seo from "../../Components/Seo";
const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
});

const Swagg = () => {
  return (
    <>
      <Seo />
      <SwaggerUI docExpansion="list" url="https://api.algotrade.net/api-docs" />
    </>
  );
};

export async function getStaticProps() {
  const empty = "";
  return {
    props: {
      data: empty,
    },
  };
}
export default Swagg;
