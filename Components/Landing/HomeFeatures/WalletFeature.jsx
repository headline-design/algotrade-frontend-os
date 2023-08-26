import {
  Box,
  Heading,
  Text,
  Link,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import PillPity from "pill-pity";
import Image from "next/image";
const WalletFeature = () => {
  const responsiveImg = useBreakpointValue({ base: 43, custom: 50 });
  const responsiveImgg = useBreakpointValue({ base: 46, custom: 53 });
  return (
    <Box
      display="flex"
      alignItems={{ base: "", lg: "center" }}
      flexDirection={{ base: "column", zz: "column", lg: "row" }}
      justifyContent={{ lg: "space-between", llg: "space-around" }}
    >
      <Box maxW={{ base: "100%", lg: "360px", llg: "450px" }}>
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
          Wallet Connect
        </Heading>
        <Text
          color="#a0aec0"
          fontSize={{ base: "0.86rem", lg: "0.97rem", llg: "1rem" }}
          fontWeight="400"
        >
          Connect with your preferred choice of wallet to start interacting with
          the app.
        </Text>
        <Text
          fontStyle="italic"
          color="#a0aec0"
          fontSize={{ base: "0.7rem", lg: "0.8rem" }}
          fontWeight="400"
        >
          Not required but recommended to maximize user experience.
        </Text>
      </Box>

      <Box
        mt={{ base: "25px", custom: "30px", zz: "30px", lg: "20px" }}
        minW={{ lg: "450px" }}
      >
        <Box
          pattern="topography"
          as={PillPity}
          padding="1.2rem"
          // bg="black"
          bgColor="var(--chakra-colors-gray-800)"
          patternFill="gray.700"
          // fontWeight="bold"
          // bg="none"
          borderRadius="8px"
          border="1px solid rgba(255, 255, 255, 0.16)"
          width="100%"
          display="flex"
          patternOpacity={0.5}
          flexDirection="column"
        >
          <Box>
            <Box
              pt="15px"
              pb="15px"
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              w="100%"
            >
              <Box
                height="43px"
                // borderRadius="50%"
                // backgroundColor="#fff"
                borderRadius="100%"
                width={responsiveImg}
                boxShadow={["0 0 43px 5px #fcec5b"]}
              >
                <Image
                  src="/PeraWalletLogo.a7b5818d.svg"
                  alt="Pera Wallet"
                  width={responsiveImg}
                  height={responsiveImg}
                />
              </Box>
              <Box borderBottom="1px solid #a0aec0" ml="20px">
                <Text
                  userSelect="none"
                  fontWeight={{ base: "600", zz: "600", lg: "500" }}
                  fontSize={{
                    base: "1.5rem ",
                    custom: "1.7rem",
                    zz: "1.7rem",
                    lg: "1.5rem",
                  }}
                >
                  Pera Wallet
                </Text>
              </Box>
            </Box>
            <Box pt="15px" pb="25px" display="flex" alignItems="center">
              <Box
                height={responsiveImgg}
                borderRadius="100%"
                // borderRadius="50%"
                // backgroundColor="#fff"
                width={responsiveImgg}
                boxShadow={["0 0 45px 5px #325ecf"]}
              >
                {" "}
                <Image
                  src="/myalgo.png"
                  alt="Myalgo wallet"
                  width={responsiveImgg}
                  height={responsiveImgg}
                />
              </Box>
              <Box borderBottom="1px solid #a0aec0" ml="20px">
                <Text
                  userSelect="none"
                  fontWeight={{ base: "600", zz: "600", lg: "500" }}
                  fontSize={{
                    base: "1.5rem ",
                    custom: "1.7rem",
                    zz: "1.7rem",
                    lg: "1.5rem",
                  }}
                >
                  MyAlgo Wallet
                </Text>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" w="100%">
            <Button
              as={Link}
              _focus={{ boxShadow: "none" }}
              _active="none"
              fontWeight="500"
              href="/"
              isExternal
              width="100%"
              // isDisabled
              border="1px solid rgba(255, 255, 255, 0.16)"
              fontSize="1rem"
              height="40px"
              pr="7px"
              pl="7px"
              lineHeight="1"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              bg="none"
              // onClick={onOpen}
              // mt={trueWidth == true && "17px"}
              // mb={trueWidth == true && "7px"}
              // width={trueWidth == true && "100%"}
            >
              Launch app
              <ExternalLinkIcon ml="3px" h="auto" w="14px" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WalletFeature;
