import { Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import MobileSwap from "../../../public/swap_sc.png";
import TabChart from "../../../public/tab_chart.png";
import SwapChildren from "./SwapChildren";
const SwapFeature = () => {
  const lgg = useBreakpointValue({ lg: "960px" });

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", lg: "row" }}
      maxH={{ lg: "650px" }}
      mt={{ base: "65px", zz: "65px", lg: "85px" }}
      justifyContent={{ lg: "space-between", llg: "space-around" }}
      alignItems={{ lg: "center" }}
    >
      <Box maxW={{ lg: "360px", llg: "450px" }} mb={{ lg: "200px" }}>
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
          {" "}
          Trade with zero fees
        </Heading>
        <Text
          color="#a0aec0"
          fontSize={{ base: "0.86rem", lg: "0.97rem", llg: "1rem" }}
          fontWeight="400"
        >
          {" "}
          Buy/sell with your preferred choice of AMM on AlgoTrade with zero
          fees.
          <Text
            fontStyle="italic"
            color="#a0aec0"
            fontSize={{ base: "0.7rem", lg: "0.8rem" }}
            fontWeight="400"
          >
            Only Tinyman will be available on launch day. Integration with all
            decentralized exchange will be part of the roadmap.
          </Text>
        </Text>
        {lgg && <SwapChildren />}
      </Box>

      <Box
        mt={{ custom: "-20px", lg: "" }}
        pt={{ lg: "20px" }}
        flexDirection={{ base: "column", lg: "row" }}
        display={{ base: "flex", lg: "block" }}
        justifyContent={{ base: "center", lg: "space-between" }}
        position="relative"
        minW={{ lg: "450px" }}
        maxW={{ lg: "450px" }}
      >
        <Box
          boxShadow={{
            base: "0 0 30px 0px rgb(28, 158, 239)",
            custom1: "none",
          }}
          overflow="hidden"
          border={{
            base: "1px solid rgba(255, 255, 255, 0.16)",
            custom1: "none",
          }}
          margin="auto"
          mt={{ base: "35px", custom1: "0" }}
          ml={{ base: "auto", custom1: "0" }}
          borderRadius="18px"
          left={{ base: "0", lg: "" }}
          position={{ base: "unset", custom1: "relative" }}
          top={{ base: "172px", custom: "", lg: "250px" }}
          maxWidth={{
            base: "265px",
            custom: "270px",
            zz: "270px",
            lg: "265px",
          }}
          zIndex="1"
        >
          <Box
            minW={{ base: "300px", custom: "", zz: "210px", lg: "300px" }}
            ml={{ base: "-16px", custom1: "-15px", custom: "", lg: "-15px" }}
            filter="saturate(1.2)"
          >
            <Image quality={100} src={MobileSwap} alt="z" />
          </Box>
        </Box>
        <Box
          display={{ base: "none", custom1: "block" }}
          maxWidth={{ base: "100%", custom: "85%", zz: "100%", lg: "380px" }}
          overflow="hidden"
          //   border="1px solid rgba(255, 255, 255, 0.16)"
          margin="auto"
          borderRadius="18px"
          //   marginRight="0"
          mr={{ base: "0", lg: "0" }}
          position="relative"
          right={{ base: "0", zz: "", lg: "" }}
          top={{ base: "-400px", custom: "-380px", zz: "-370px", lg: "" }}
        >
          <Box
            mt="-100px"
            minW={{ base: "450px", custom: "", zz: "100%", lg: "570px" }}
            ml={{ base: "-90px", custom: "", zz: "", lg: "-85px" }}
            filter="saturate(1.2)"
          >
            <Image quality={100} src={TabChart} alt="z" />
            {/* <Image quality={100} src={MobileChart} alt="z" /> */}
          </Box>
        </Box>
      </Box>
      {!lgg && <SwapChildren />}
    </Box>
  );
};

export default SwapFeature;
