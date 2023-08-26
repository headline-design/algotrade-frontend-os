import { useContext } from "react";
import styles from "../../styles/Home.module.css";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import WalletOverview from "../../Components/WalletOverview";
import dynamic from "next/dynamic";
import Seo from "../../Components/Seo";
import { GetAddress, GetAlgo, GetAccountTx } from "../../lib/CustomSWR";
import { AddressContext, AssetsList } from "../_app";
const WalletAssets = dynamic(
  () => import("../../Components/WalletOverview/WalletAssets"),
  {
    ssr: false,
  }
);
const Wallet = () => {
  const router = useRouter();
  const address = useContext(AddressContext);
  const asaList = useContext(AssetsList);
  const { data: price } = GetAlgo("latest");
  const { data: asa } = GetAddress(address);
  const { data: accountTx } =
    typeof window !== "undefined" &&
    router.asPath.split("/wallet")[1] != "?transactions=all" &&
    GetAccountTx(address);
  return (
    <>
    <Seo />
      <Box className={styles.container} pb={{ base: "unset", lg: " 40px" }}>
        {typeof window !== "undefined" &&
        localStorage.getItem("wallet") != null ? (
          <>
            <WalletOverview price={price} asa={asa} />
            <WalletAssets
              asaList={asaList}
              accountTx={accountTx}
              price={price}
              asa={asa}
            />
          </>
        ) : typeof window !== "undefined" &&
          router.asPath.split("/wallet")[1] == "?transactions=all" ? (
          router.push("/app/wallet")
        ) : (
          "denied"
        )}
      </Box>
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
export default Wallet;
