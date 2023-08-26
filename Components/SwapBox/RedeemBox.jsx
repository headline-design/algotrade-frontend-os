import { Box, Text, Link, Skeleton } from "@chakra-ui/react";
import NextLink from "next/link";
import { CheckIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import TruncateString from "../../utils/truncateString";
import ReturnDecimals from "../../utils/returnDecimals";
const RedeemBox = ({ swapTx, idRef, redeeming, redeemSuccess, txId }) => {
  const decimals =
    swapTx.redeemId == idRef.asset_1_id
      ? idRef.asset_1_decimals
      : idRef.asset_2_decimals;
  return redeeming == false ? (
    swapTx.redeemAmount != null &&
      (redeemSuccess == false ? (
        <Box>
          <Box
            pt="8px"
            display="flex"
            alignItems="baseline"
            justifyContent="space-between"
            mb="6px"
          >
            <Box>
              <Text color="#b3bac1" fontSize="0.92rem" fontWeight="500">
                Excess
              </Text>
            </Box>
            <Box display="flex" flexDirection="column" textAlign="right">
              <Box>
                <Text
                  color="#b3bac1"
                  fontSize="0.9rem"
                  fontWeight="500"
                  lineHeight="1.2"
                >
                  {`${(decimals == 0
                    ? Number(swapTx.redeemAmount)
                    : Number(swapTx.redeemAmount) /
                      ReturnDecimals(
                        swapTx.redeemId == idRef.asset_1_id
                          ? idRef.asset_1_decimals
                          : idRef.asset_2_decimals
                      )
                  )
                    .toFixed(decimals)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${
                    swapTx.redeemId == idRef.asset_1_id
                      ? idRef.asset_1_name
                      : idRef.asset_2_name
                  }`}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box mb="8px">
            <Text color="#b3bac1" fontSize="0.81rem" fontWeight="500">
              You can claim now or later from your wallet.{" "}
              <Link
                width="100%"
                _focus="none"
                _active="none"
                fontSize={{ base: "0.79rem", lg: "0.81rem" }}
                color="#b3bac1"
                textDecoration="underline"
                fontWeight="500"
                href="https://docs.tinyman.org/tinyman-amm-basics/slippage-and-excess"
                isExternal
              >
                Learn more about excess
              </Link>
            </Text>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            pt="8px"
            display="flex"
            alignItems="baseline"
            flexDirection="column"
            mb="6px"
          >
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center">
                <CheckIcon
                  padding="4px"
                  w="1.1rem"
                  h="1.1rem"
                  borderRadius="5px"
                  color="var(--chakra-colors-gray-800)"
                  bg="rgb(70 214 160)"
                />
                <Text
                  ml="5px"
                  color="#b3bac1"
                  fontSize="0.92rem"
                  fontWeight="500"
                >
                  Success
                </Text>
              </Box>
              <Text color="#b3bac1" fontSize="0.85rem" fontWeight="500">
                Redeemed{" "}
                {`${(decimals == 0
                  ? Number(swapTx.redeemAmount)
                  : Number(swapTx.redeemAmount) /
                    ReturnDecimals(
                      swapTx.redeemId == idRef.asset_1_id
                        ? idRef.asset_1_decimals
                        : idRef.asset_2_decimals
                    )
                )
                  .toFixed(decimals)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${
                  swapTx.redeemId == idRef.asset_1_id
                    ? idRef.asset_1_name
                    : idRef.asset_2_name
                }`}
              </Text>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              width="100%"
              justifyContent="space-between"
            >
              <Box>
                <Text fontSize="0.9rem" fontWeight="500" color="#a0aec0">
                  {TruncateString(txId, 17)}
                </Text>
              </Box>
              <Box>
                <NextLink
                  href={`https://algoexplorer.io/tx/${encodeURIComponent(
                    txId
                  )}`}
                  passHref
                >
                  <Link
                    isExternal="true"
                    _focus="none"
                    display="flex"
                    alignItems="center"
                    textDecoration="none"
                    _hover="none"
                  >
                    <ExternalLinkIcon
                      w="0.85rem"
                      h="auto"
                      color="#a0aec0"
                      bg="none"
                    />
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </Box>
        </Box>
      ))
  ) : redeemSuccess == false ? (
    <Box>
      <Box
        pt="8px"
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        mb="6px"
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Skeleton
            width="13px"
            borderRadius="8px"
            height="13px"
            background="#515e6b"
          >
            {" "}
            <Box width="100%" height="auto" />
          </Skeleton>
          <Skeleton
            ml="5px"
            width="50px"
            borderRadius="8px"
            height="9px"
            background="#515e6b"
          >
            {" "}
            <Box width="100%" height="auto" />
          </Skeleton>
        </Box>
      </Box>
      <Box mb="8px">
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Skeleton
            mt="4px"
            mb="4px"
            width="225px"
            borderRadius="8px"
            height="9px"
            background="#515e6b"
          >
            {" "}
            <Box width="100%" height="auto" />
          </Skeleton>
          <Skeleton
            mt="4px"
            mb="4px"
            width="225px"
            borderRadius="8px"
            height="9px"
            background="#515e6b"
          >
            {" "}
            <Box width="100%" height="auto" />
          </Skeleton>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box>
      <Box
        pt="8px"
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        mb="6px"
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center">
            <CheckIcon
              padding="6px"
              w={6}
              h={6}
              borderRadius="8px"
              color="var(--chakra-colors-gray-800)"
              bg="green.400"
            />
            <Text ml="5px" color="#b3bac1" fontSize="0.92rem" fontWeight="500">
              Success
            </Text>
          </Box>
          <Text ml="5px" color="#b3bac1" fontSize="0.85rem" fontWeight="500">
            Redeemed{" "}
            {`${(decimals == 0
              ? Number(swapTx.redeemAmount)
              : Number(swapTx.redeemAmount) /
                ReturnDecimals(
                  swapTx.redeemId == idRef.asset_1_id
                    ? idRef.asset_1_decimals
                    : idRef.asset_2_decimals
                )
            )
              .toFixed(decimals)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${
              swapTx.redeemId == idRef.asset_1_id
                ? idRef.asset_1_name
                : idRef.asset_2_name
            }`}
          </Text>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <Box>
            <Text fontSize="0.9rem" fontWeight="500" color="#a0aec0">
              {TruncateString(txId, 17)}
            </Text>
          </Box>
          <Box>
            <NextLink
              href={`https://algoexplorer.io/tx/${encodeURIComponent(txId)}`}
              passHref
            >
              <Link
                isExternal="true"
                _focus="none"
                display="flex"
                alignItems="center"
                textDecoration="none"
                _hover="none"
              >
                <ExternalLinkIcon
                  padding="6px"
                  w={6}
                  h={6}
                  color="#a0aec0"
                  bg="none"
                />
              </Link>
            </NextLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default RedeemBox;
