import MobileApp from "../../public/desktop_table.png";
import MobileTable from "../../public/desktop_chart.png";
import Image from "next/image";
import { Box, Heading, Button, Link, Text } from "@chakra-ui/react";
import Social from "./Social";
import LandingPanel from "./LandingPanel";
import Countdown from "./Countdown";
const HomeHero = () => {
  return (
    <Box as="section" id="hero">
      <LandingPanel>
        <Box
          mb={{ base: "8px", zz: "17px", lg: "0" }}
          display="flex"
          flexDirection={{ base: "column" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent={{ lg: "space-evenly", llg: "space-between" }}
            maxHeight={{ lg: "660px", llg: "720px" }}
            pt={{ base: "30px", zz: "30px", lg: "110px" }}
          >
            <Box height="100%" maxW={{ lg: "45%" }}>
              <Box
                pt={{
                  base: "35px",
                  lg: "5px",
                  llg: "35px",
                  xl: "30px",
                  ql: "70px",
                }}
              >
                <Heading
                  lineHeight={{ base: "1.05", custom1: "" }}
                  as="h1"
                  fontSize={{
                    base: "2.7rem",
                    custom1: "3rem",
                    custom: "10vw",
                    zz: "9vw",
                    lg: "3rem",
                    llg: "3.4rem",
                    xl: "3.75rem",
                  }}
                  fontWeight="600"
                >
                  Discover real-time prices, charts, and swap with zero added fees.
                </Heading>
                {/* <Text display={{ base: "none", lg: "unset" }}>
              AlgoTrade is a trading app for the Algorand blockchain
          </Text> */}
              </Box>
              <Countdown />
              <Box width="100%" pt={{ base: "25px", zz: "45px", lg: "10px" }}>
                <Button
                  isExternal
                  mb="10px"
                  as={Link}
                  _focus={{ boxShadow: "none" }}
                  _active="none"
                  fontWeight="600"
                  href="/"
                  width={{ base: "100%", lg: "150px" }}
                  fontSize="1rem"
                  height="40px"
                  lineHeight="1"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                  bg="#069dbd"
                  // onClick={onOpen}
                  // mt={trueWidth == true && "17px"}
                  // mb={trueWidth == true && "7px"}
                  // width={trueWidth == true && "100%"}
                >
                  Launch App
                </Button>
                <Text
                  fontFamily="sans-serif"
                  fontSize="0.95rem"
                  color="#a0aec0"
                  mb="2px"
                >
                  The wait is over, your journey with AlgoTrade begins now.
                </Text>
                <Social />
              </Box>
            </Box>
            <Box
              // position="relative"
              display={{ base: "none", lg: "flex" }}
              flexDirection={{ base: "column-reverse" }}
              alignItems="center"
            >
              <Box
                zIndex="1"
                margin="auto"
                maxWidth={{ lg: "270px", llg: "365px", xl: "400px" }}
                maxHeight={{ lg: "215px", llg: "247px", xl: "271px" }}
                borderRadius="18px"
                overflow="hidden"
                display="flex"
                position="relative"
                left="-160"
                bottom="170"
                //   mr="-100px"
                //   justifyContent="center"
              >
                <Box
                  ml="0"
                  mt="-0.8px"
                  minWidth={{ lg: "815px", llg: "750px", xl: "820px" }}
                  margin="auto"
                >
                  <Image quality={100} src={MobileApp} alt="z" />
                </Box>
              </Box>
              <Box
                boxShadow={["0 0 30px 0 rgb(28, 158, 239)"]}
                margin="auto"
                maxWidth={{ lg: "330px", llg: "420px", xl: "560px" }}
                borderRadius="18px"
                overflow="hidden"
                ml={{ lg: "0", xl: "0" }}
                display="flex"
                //   justifyContent="center"
              >
                <Box
                  minWidth={{ lg: "500px", llg: "560px", xl: "530px" }}
                  borderRadius="18px"
                  overflow="hidden"
                >
                  <Box mt="-0.6px" ml={{ lg: "-5px", xl: "" }}>
                    <Image quality={100} src={MobileTable} alt="z" />
                  </Box>
                </Box>
              </Box>

              {/* <Image width="100%" src="/trading_history.png" alt="z" /> */}
            </Box>{" "}
          </Box>
        </Box>
      </LandingPanel>
    </Box>
  );
};

export default HomeHero;
