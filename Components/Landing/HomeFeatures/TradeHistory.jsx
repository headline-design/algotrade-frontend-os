import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import MobileSwap from "../../../public/swap_sc.png";
import MobileChart from "../../../public/chart_mobile.png";
import TradeHistory from "../../../public/trade_history.png";
import TradeHistoryy from "../../../public/trading_historyyy.png";
import TradeHistoryyy from "../../../public/trading_.png";
const TradeFeature = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", lg: "row-reverse" }}
      justifyContent={{ lg: "space-between", llg: "space-around" }}
      alignItems={{ lg: "center" }}
      pt={{ base: "65px", zz: "65px", lg: "30px" }}
    >
      <Box maxW={{ lg: "360px", llg: "450px" }}>
        <Heading
          fontSize={{
            base: "2rem",
            custom: "2.3rem",
            zz: "2.3rem",
            lg: "2.5rem",
            llg: "2.65rem",
          }}
          as="h2"
          mb={{ lg: "6px" }}
        >
          View trade history
        </Heading>
        <Text
          color="#a0aec0"
          fontSize={{ base: "0.86rem", lg: "0.97rem", llg: "1rem" }}
          fontWeight="400"
        >
          View your past trades or a pool's trade history. You can view your
          wallet's trade history with no date range limit.
        </Text>
      </Box>

      <Box
        mt={{ base: "10px", custom: "10px", zz: "30px", lg: "20px" }}
        minW={{ lg: "400px" }}
      >
        <Box pt="20px" display="flex" justifyContent="center">
          <Box
            // boxShadow={["0 0 85px 1px #006378"]}
            margin="auto"
            borderRadius="18px"
            overflow="hidden"
            ml={{ base: "auto", lg: "0" }}
            display="flex"
            //   justifyContent="center"

            boxShadow={["0 0 40px 3px #006378"]}
          >
            <Box
              borderRadius="18px"
              overflow="hidden"
              maxWidth={{ zz: "100%", lg: "450px" }}
            >
              <Box
                mb="-55px"
                filter="saturate(1.2)"
                minWidth={{
                  base: "540px",
                  custom: "",
                  zz: "65px",
                  lg: "650px",
                }}
              >
                <Image quality={100} src={TradeHistoryyy} alt="z" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TradeFeature;
