import {
  Box,
  NumberInput,
  NumberInputField,
  Text,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const ResultsBox = ({
  decimals,
  type,
  value,
  received,
  liquidity_1,
  liquidity_2,
  minMax,
  fees,
  slippage,
  setSlippage,
  idRef,
  impact,
  isOptedIn,
  account,
  p,
  confirmTrue,
}) => {
  const numbStrr = (plpl) => {
    const numstr = plpl;
    while (numstr[numstr.length - 1] === "0") {
      numstr = numstr.slice(0, -1);
      if (numstr[numstr.length - 1] !== "0") {
        return numstr;
      }
      if (numstr[numstr.length - 3] === ".") {
        return numstr;
      }
    }
    return numstr;
  };
  return (
    <Box pt="13px">
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        mb="6px"
      >
        <Box>
          <Text
            color={confirmTrue == true && "#b3bac1"}
            fontSize="0.95rem"
            fontWeight={confirmTrue == true ? "500" : "400"}
          >
            {type == "fi" ? "Min Received" : "Maximum Sent"}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" textAlign="right">
          <Box>
            <Text
              color={confirmTrue == true && "#b3bac1"}
              fontSize="0.95rem"
              fontWeight={confirmTrue == true ? "500" : "400"}
              lineHeight="1.2"
            >
              {type == "fi"
                ? `${minMax
                    .toFixed(idRef.asset_2_decimals)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${idRef.asset_2_name}`
                : `${minMax
                    .toFixed(idRef.asset_1_decimals)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${
                    idRef.asset_1_name
                  }`}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="5px"
      >
        <Box>
          <Text
            color={confirmTrue == true && "#b3bac1"}
            fontSize="0.95rem"
            fontWeight={confirmTrue == true ? "500" : "400"}
          >
            Slippage Tolerance
          </Text>
        </Box>
        <Box>
          <NumberInput
            min={0}
            isDisabled={confirmTrue && true}
            borderRadius="7px"
            lineHeight="2"
            size="sm"
            color={confirmTrue == true && "#b3bac1"}
            height="24.5px"
            width="77px"
            step={0.1}
            fontWeight={confirmTrue == true ? "500" : "400"}
            defaultValue={0.5}
            value={slippage}
            onChange={(slippage) => {
              setSlippage(slippage);
            }}
          >
            <NumberInputField
              isDisabled={confirmTrue && true}
              border="none"
              color={confirmTrue == true && "#b3bac1"}
              borderBottom="1px solid grey"
              height="24.5px"
              _focus="none"
              _active="none"
            />
            <NumberInputStepper flexDirection="row">
              <NumberIncrementStepper
                color={confirmTrue == true && "#b3bac1"}
                border="none"
                isDisabled={confirmTrue && true}
              />
              <NumberDecrementStepper
                color={confirmTrue == true && "#b3bac1"}
                border="none"
                mt="0 !important"
                isDisabled={confirmTrue && true}
              />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        mb="5px"
      >
        <Text
          color={confirmTrue == true && "#b3bac1"}
          fontSize="0.95rem"
          fontWeight={confirmTrue == true ? "500" : "400"}
        >
          Swap Fee
        </Text>
        <Box>
          <Text
            color={confirmTrue == true && "#b3bac1"}
            fontWeight={confirmTrue == true ? "500" : "400"}
            fontSize="0.95rem"
          >
            {`${numbStrr(
              fees
                .toFixed(idRef.asset_1_decimals)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            )} ${idRef.asset_1_name}`}
          </Text>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        mb="10px"
      >
        <Text
          color={confirmTrue == true && "#b3bac1"}
          fontSize="0.95rem"
          fontWeight={confirmTrue == true ? "500" : "400"}
        >
          Price Impact
        </Text>
        <Box>
          <Text
            color={confirmTrue == true && "#b3bac1"}
            fontSize="0.95rem"
            fontWeight={confirmTrue == true ? "500" : "400"}
          >
            {impact}%
          </Text>

          {/* <Text>{swap_quote.priceImpact}%</Text> */}
        </Box>
      </Box>
      {/* <Box display="flex">
        {localStorage.getItem("wallet") == null ? (
          <ConnectModal />
        ) : (
          <BuyButton
            assetIndexOne={idRef.asset_1_id}
            assetIndexTwo={idRef.asset_2_id}
            account={account}
            poolAddress={decimals[0].pool_creator}
            type={type}
            value_1={type == "fi" ? value : received}
            value_2={
              type == "fi"
                ? minMax
                    .toFixed(idRef.asset_2_decimals)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                : minMax
                    .toFixed(idRef.asset_1_decimals)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }
            isOptedIn={isOptedIn}
            assetOneDecimals={idRef.asset_1_decimals}
            assetTwoDecimals={idRef.asset_2_decimals}
            poolId={decimals[0].pool_id}
          />
        )}
      </Box> */}
    </Box>
  );
};
export default ResultsBox;
