import WalletFeature from "./WalletFeature";
import TradeFeature from "./TradeHistory";
import SwapFeature from "./SwapFeature";
import { Box } from "@chakra-ui/react";

import LandingPanel from "../LandingPanel";
const HomeFeatures = () => {
  return (
    <Box as="section" id="features">
      <LandingPanel>
        <WalletFeature />
        <TradeFeature />
        <SwapFeature />
      </LandingPanel>
    </Box>
  );
};

export default HomeFeatures;
