import {
  Box,
  Heading,
  Link,
  IconButton,
  useClipboard,
  Text,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import ReturnDecimals from "../../utils/returnDecimals";
import NextLink from "next/link";
import ImageWithFallback from "../Image/nextImage";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { ArrowUpLong } from "../Icons/Icons";
import TruncateString from "../../utils/truncateString";
const ConfirmSwap = ({
  outAmount,
  idRef,
  inAmount,
  asaVerified,
  minMax,
  type,
  children,
  transacting,
  successSwap,
  swapTx,
}) => {
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const { hasCopied, onCopy } = useClipboard(swapTx && swapTx.txId);

  return (
    <Box
      borderTopRadius="5px"
      pt="10px"
      pb="10px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        pl="15px"
        pr="15px"
        alignItems="center"
        justifyContent="space-between"
        pt="10px"
        pb="10px"
        width="100%"
        borderRadius="8px"
        bg="#242e3c"
      >
        <Box display="flex" alignItems="center">
          <Box display="flex" mr="8px">
            <ImageWithFallback
              className="imgBorder"
              key={idRef.asset_1_id}
              src={`${ASSET_LOGO_BASE_URL}/${idRef.asset_1_id}/icon.png`}
              width={23}
              height={23}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Box display="flex" alignItems="center">
              <Heading as="h3" fontSize="0.9rem" fontWeight="400">
                {idRef.asset_1_name}
              </Heading>
            </Box>
          </Box>
        </Box>
        <Box>
          {successSwap == false ? (
            transacting == false ? (
              <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
                {outAmount}
              </Text>
            ) : transacting == true && type == "fo" ? (
              <Spinner size="sm" />
            ) : (
              <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
                {outAmount}
              </Text>
            )
          ) : (
            <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
              {type == "fo"
                ? `${
                    idRef.asset_1_decimals != 0
                      ? swapTx.out / ReturnDecimals(idRef.asset_1_decimals)
                      : swapTx.out
                  }`
                : outAmount}
            </Text>
          )}
          {/* {transacting == false && (
            <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
              {successSwap == false
                ? outAmount
                : type == "fo"
                ? `${swapTx.out}`
                : outAmount}
            </Text>
          )}
          {transacting == true && type == "fo" ? (
            <Spinner size="sm" />
          ) : (
            <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
              {outAmount}
            </Text>
          )} */}
        </Box>
        {/* {balance && balance != NaN && balance > 0 && (
            <>
              <Box display="flex" flexDirection="column" alignItems="end">
                  
                <Text fontSize="0.85rem">
                  Balance {balance / ReturnDecimals(decimals)}
                </Text>
                <Text color="#b3bac1" fontSize="0.75rem">
                  {balance / ReturnDecimals(decimals)}
                </Text>
              </Box>
            </>
          )} */}
      </Box>
      <ArrowUpLong
        height="auto"
        width="14px"
        fill="white"
        mt="10px"
        mb="10px"
      />

      <Box
        bg="#242e3c"
        pl="15px"
        pr="15px"
        pt="10px"
        pb="10px"
        display="flex"
        borderRadius="8px"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center">
          <Box display="flex" mr="8px">
            <ImageWithFallback
              className="imgBorder"
              key={idRef.asset_2_id}
              src={`${ASSET_LOGO_BASE_URL}/${idRef.asset_2_id}/icon.png`}
              width={23}
              height={23}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Box display="flex" alignItems="center">
              <Heading as="h3" fontSize="0.9rem" fontWeight="400">
                {idRef.asset_2_name}
              </Heading>
            </Box>
          </Box>
        </Box>
        <Box>
          {successSwap == false ? (
            transacting == false ? (
              <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
                {inAmount}
              </Text>
            ) : transacting == true && type == "fi" ? (
              <Spinner size="sm" />
            ) : (
              <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
                {inAmount}
              </Text>
            )
          ) : (
            <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
              {type == "fi"
                ? `${
                    idRef.asset_2_decimals != 0
                      ? swapTx.in / ReturnDecimals(idRef.asset_2_decimals)
                      : swapTx.in
                  }`
                : inAmount}
            </Text>
          )}
          {/* {transacting == false && (
            <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
              {successSwap == false
                ? inAmount
                : type == "fi"
                ? `${swapTx.in}`
                : inAmount}
            </Text>
          )}
          {transacting == true && type == "fi" ? (
            <Spinner size="sm" />
          ) : (
            <Text color="#b3bac1" fontSize="0.9rem" fontWeight="500">
              {inAmount}
            </Text>
          )} */}
        </Box>
        {/* {balance && balance != NaN && balance > 0 && (
            <>
              <Box display="flex" flexDirection="column" alignItems="end">
                  
                <Text fontSize="0.85rem">
                  Balance {balance / ReturnDecimals(decimals)}
                </Text>
                <Text color="#b3bac1" fontSize="0.75rem">
                  {balance / ReturnDecimals(decimals)}
                </Text>
              </Box>
            </>
          )} */}
      </Box>
      <Box>
        {successSwap == false ? (
          <Text
            color="#b3bac1"
            fontSize="0.83rem"
            fontWeight="500"
            mt="15px"
            mb="15px"
          >
            {type == "fi"
              ? `You will receive a minimum of ${minMax} ${idRef.asset_2_name} or the swap will revert.`
              : `You will send a maximum of ${minMax} ${idRef.asset_1_name} or the swap will revert.`}
          </Text>
        ) : (
          <>
            <Text
              color="#b3bac1"
              fontSize="0.83rem"
              fontWeight="500"
              mt="15px"
              mb="15px"
            >
              The above is the final outcome of your swap.{" "}
              {swapTx.redeemAmount != null &&
                "Below is some of the the excess from your swap."}
            </Text>
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              justifyContent="space-between"
              pl="15px"
              pr="15px"
              bg="#242e3c"
              borderRadius="8px"
            >
              <Box>
                <Tooltip
                  fontWeight="500"
                  color="#fff"
                  bg="var(--chakra-colors-gray-800)"
                  label={hasCopied ? "Copied" : "Copy"}
                  placement="top-start"
                >
                  <Text
                    cursor="pointer"
                    onClick={onCopy}
                    fontSize="0.95rem"
                    fontWeight="500"
                    color="#0bc1e7"
                  >
                    {TruncateString(swapTx.txId, 17)}
                  </Text>
                </Tooltip>
              </Box>
              <Box display="flex" alignItems="center">
                <Tooltip
                  mr="2.5px"
                  fontWeight="500"
                  color="#fff"
                  bg="var(--chakra-colors-gray-800)"
                  label={hasCopied ? "Copied" : "Copy"}
                  placement="top-start"
                >
                  <IconButton
                    _active="none"
                    _focus="none"
                    _hover="none"
                    width="auto"
                    color="#a0aec0"
                    bg="none"
                    onClick={onCopy}
                    icon={<CopyIcon w="0.85rem" h="auto" />}
                  />
                </Tooltip>
                <NextLink
                  href={`https://algoexplorer.io/tx/${encodeURIComponent(
                    swapTx.txId
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
          </>
        )}
      </Box>
      <Box
        mt={swapTx.redeemAmount != null && "15px"}
        bg="#242e3c"
        pl="15px"
        pr="15px"
        borderRadius="8px"
        width="100%"
      >
        {children}
      </Box>
    </Box>
  );
};

export default ConfirmSwap;
