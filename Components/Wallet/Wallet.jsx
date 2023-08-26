import { Box, Text, Spinner, useBreakpointValue } from "@chakra-ui/react";
import WalletModal from "./WalletModal";
import { UsdIcon } from "../Icons/Icons";
import dynamic from "next/dynamic";
import MobileMenu from "./MobileMenu";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Settings from "./Settings";
import { useContext } from "react";
import SearchIndicator from "./SearchIndicator";
import ImageWithFallback from "../Image/nextImage";
import { GetAlgo } from "../../lib/CustomSWR";
import { AddressContext } from "../../pages/_app";
const ConnectModal = dynamic(() => import("./ConnectModal"), {
  ssr: false,
});

const Wallet = () => {
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const { data: algoPrice } = GetAlgo("latest");
  const algoUSD =
    algoPrice &&
    algoPrice[algoPrice.length - 1].close_price
      .toFixed(4)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const { data: price } = GetAlgo("hdl-latest");
  const address = useContext(AddressContext);
  const mobile = useBreakpointValue({ lg: "960px" });
  return (
    <Box
      margin="auto"
      pl={{ base: "0", lg: "85px", "3xl": "85px" }}
      w={{
        base: "100%",
        xl: "100%",
        "3xl": "1400px",
      }}
    >
      <Box
        padding={{ base: "0", lg: "18px 2rem", "3xl": "18px 0 18px 0" }}
        margin="auto"
        maxW={{ "3xl": "1400px" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt="15px"
        pb="15px"
      >
        <Box display="flex" alignItems="center">
          <Box
            bg="#242e3c"
            display="flex"
            alignItems="center"
            padding="7px 12px 7px 12px"
            borderRadius="5px"
          >
            <Box display="flex" alignItems="center" minW="25px" height="auto">
              <ImageWithFallback
                alt="Algorand"
                src={`${ASSET_LOGO_BASE_URL}/137594422/icon.png`}
                width={25}
                height={25}
              />
            </Box>
            <Box display="flex" alignItems="center" ml="7px">
              {!price ? (
                <Spinner />
              ) : (
                <>
                  <UsdIcon mr="2px" width="8px" height="auto" fill="white" />
                  <Box display="flex" alignItems="baseline">
                    <Text fontWeight="600" mr="4px">
                      {(price[price.length - 1].close_price * algoUSD)
                        .toFixed(6)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </Text>
                    <Text
                      fontSize="0.8rem"
                      fontWeight="600"
                      color={
                        price[price.length - 1].percentage_diff < 0
                          ? "#ff6c4c"
                          : "#19bd78"
                      }
                    >
                      {price[price.length - 1].percentage_diff
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      %
                    </Text>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <SearchIndicator />
          {mobile && <Settings />}
          <MobileMenu />
          {address ? (
            <Box position="relative">
              <WalletModal />
            </Box>
          ) : (
            mobile && <ConnectModal trueWidth={true} head={true} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Wallet;
