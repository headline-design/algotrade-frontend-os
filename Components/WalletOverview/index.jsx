import { Box, Text, IconButton, Heading, Spinner } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AlgoSvg } from "../Icons/Icons";

const WalletOverview = ({ price, asa, asaList }) => {
  const algoUsd =
    price != undefined &&
    (
      price[price.length - 1].close_price -
      price[price.length - 1].close_price * 0.003
    )
      .toFixed(6)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return (
    <>
      <Box
        padding="20px"
        mt={{ base: "20px", lg: "unset" }}
        bg="rgb(31, 39, 51)"
        width="100%"
        borderRadius="8px"
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Box>
            <Box display="flex" alignItems="baseline">
              <Text
                color="whiteAlpha.900"
                fontSize="1.3rem"
                fontWeight="500"
                mr="8px"
              >
                Estimated Balance
              </Text>
              {/* <IconButton
                bg="#242e3c"
                height="auto"
                pt="5.5px"
                pb="5.5px"
                pr="8px"
                pl="8px"
                width="auto"
                minW="unset"
              >
                <ViewIcon color="#a0aec0" height="13px" width="auto" />
              </IconButton> */}
            </Box>
            <Box>
              {!asa ? (
                <Spinner />
              ) : (
                <Box display="flex" alignItems="center" mt="1px">
                  <AlgoSvg height="auto" width="15px" fill="white" mr="3.5px" />
                  <Text fontSize="1.4rem" mr="6.5px">
                    {asa.account.amount / 1000000}
                  </Text>
                  <Text color="#a0aec0" fontWeight="500" fontSize="1.4rem">
                    = $
                    {((asa.account.amount / 1000000) * algoUsd)
                      .toFixed(6)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {/* <Box>hi</Box> */}
      </Box>
      {/* <Box display="flex" flexDirection="column">
        <Box padding="20px">
          <Heading fontSize="1.1rem" as="h2" fontWeight="500">
            Assets
          </Heading>
        </Box>
      </Box>{" "} */}
    </>
  );
};

export default WalletOverview;
