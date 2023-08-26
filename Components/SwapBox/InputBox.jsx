import { Box, Heading, Text } from "@chakra-ui/react";
import ReturnDecimals from "../../utils/returnDecimals";
import ImageWithFallback from "../Image/nextImage";
import { VerifiedIcon } from "../Icons/Icons";

const InputBox = ({
  refName,
  refId,
  asaId,
  asaName,
  asaVerified,
  wallet,
  decimals,
  asaPrice,
  algo,
  hideBalance,
}) => {
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key]["asset-id"] === value);
  }
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const balance =
    wallet != undefined && refId != 0
      ? wallet.account.assets[
          getKeyByValue(wallet.account.assets, Number(refId))
        ] != undefined &&
        wallet.account.assets[
          getKeyByValue(wallet.account.assets, Number(refId))
        ].amount
      : wallet != undefined &&
        wallet.account != undefined &&
        wallet.account.amount;
  const price =
    refId == 0
      ? algo != undefined &&
        (
          algo[algo.length - 1].close_price -
          algo[algo.length - 1].close_price * 0.003
        )
          .toFixed(decimals)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      : asaPrice != undefined &&
        asaPrice.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return (
    <Box
      bg="#242e3c"
      borderTopRadius="5px"
      pl="15px"
      pr="15px"
      pt="10px"
      pb="10px"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box display="flex" mr="8px">
            <ImageWithFallback
              alt={refName == "" ? asaName : refName}
              className="imgBorder"
              key={refId == "" ? asaId : refId}
              src={`${ASSET_LOGO_BASE_URL}/${refId == "" ? asaId : refId}/icon.png`}
              width={30}
              height={30}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Box display="flex" alignItems="center">
              <Heading as="h3" fontSize="1rem" fontWeight="600">
                {refName}
              </Heading>
              {asaVerified == "true" && (
                <VerifiedIcon
                  ml="5px"
                  height="auto"
                  width={{ base: "14.5px", zz: "14.5px" }}
                  fill="#00aed3"
                />
              )}
            </Box>
            <Box>
              <Text fontSize="0.85rem" color="#a0aec0">
                # {refId == "" ? asaId : refId}
              </Text>
            </Box>
          </Box>
        </Box>
        {hideBalance == false &&
          (balance && balance != NaN && balance != 0 ? (
            <>
              <Box display="flex" flexDirection="column" alignItems="end">
                <Text fontSize="0.85rem" fontWeight="300">
                  Bal{" "}
                  {decimals != 0 ? balance / ReturnDecimals(decimals) : balance}
                </Text>
                <Text color="#b3bac1" fontSize="0.75rem" fontWeight="300">
                  {/* {balance / ReturnDecimals(decimals)} */}${" "}
                  {decimals != 0
                    ? ((balance / ReturnDecimals(decimals)) * price)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : (balance * price)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
              </Box>
            </>
          ) : (
            <>
              <Box display="flex" flexDirection="column" alignItems="end">
                <Text fontSize="0.85rem" fontWeight="300">
                  Bal 0
                </Text>
                <Text color="#b3bac1" fontSize="0.75rem" fontWeight="300">
                  {/* {balance / ReturnDecimals(decimals)} */}$ 0
                </Text>
              </Box>
            </>
          ))}
      </Box>
    </Box>
  );
};

export default InputBox;
