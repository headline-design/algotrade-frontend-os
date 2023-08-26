import { Box, Text, Spinner } from "@chakra-ui/react";
import { AlgoUsdIcon } from "../Icons/Icons";
import { GetAlgo } from "../../lib/CustomSWR";
const ChartLabel = () => {
  const { data: price } = GetAlgo('latest')
  return (
    <Box pl="8px">
      <Text fontSize="0.9rem">ALGO/USD</Text>
      <Box display="flex" alignItems="center">
        {!price ? (
          <Spinner />
        ) : (
          <>
            <Box display="flex" alignItems="center">
              <AlgoUsdIcon fill="#c2ccd9" w="9px" height="auto" />
              <Text
                ml="3px"
                color="#c2ccd9"
                letterSpacing="0.3px"
                fontSize="1.2rem"
                fontWeight="500"
              >
                {(
                  price[price.length - 1].close_price -
                  price[price.length - 1].close_price * 0.003
                )
                  .toFixed(4)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
            </Box>
            <Box pl="0.3rem" display="flex" alignItems="center">
              <Text
                letterSpacing="0.3px"
                color={
                  price[price.length - 1].percentage_diff < 0
                    ? "#ff6c4c"
                    : "#19bd78"
                }
                fontSize="0.85rem"
                fontWeight="500"
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
  );
};

export default ChartLabel;
